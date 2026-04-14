const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function generateBatteryCurve() {
  const data = [];
  const startLevel = 5 + Math.random() * 10;
  const endLevel = startLevel + 40 + Math.random() * 40;
  for (let i = 0; i < 12; i++) {
    const progress = i / 11;
    const base = startLevel + (endLevel - startLevel) * progress;
    const noise = (Math.random() - 0.3) * 2;
    data.push(parseFloat(Math.min(100, Math.max(0, base + noise)).toFixed(1)));
  }
  return data;
}

let sensorState = {
  powerData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10),
  batteryData: generateBatteryCurve(),
  temperature: 24.5,
  relayStatus: 'on'
};
let appSettings = {};

setInterval(() => {
  const lastPower = sensorState.powerData[sensorState.powerData.length - 1];
  const fluctuation = lastPower * 0.05;
  let currentPower = lastPower + (Math.random() * 2 - 1) * fluctuation;
  currentPower = Math.min(120, Math.max(0, currentPower));
  currentPower = parseFloat(currentPower.toFixed(1));

  const newPowerData = [...sensorState.powerData];
  newPowerData[newPowerData.length - 1] = currentPower;

  sensorState.powerData = newPowerData;
  sensorState.temperature += (Math.random() - 0.5) * 0.5;
}, 5000);

app.get('/', (req, res) => {
  res.send('EV Monitor Backend API is running! Use /api/status to get data.');
});

app.get('/api/status', (req, res) => {
  res.json({
    ...sensorState,
    settings: appSettings,
    connectionStatus: 'ok'
  });
});

app.post('/api/settings', (req, res) => {
  appSettings = { ...appSettings, ...req.body };

  if (req.body.randomizeChart) {
    sensorState.powerData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);
    delete appSettings.randomizeChart;
  }
  if (req.body.randomizeBattery) {
    sensorState.batteryData = generateBatteryCurve();
    delete appSettings.randomizeBattery;
  }

  console.log('Updated settings:', appSettings);
  res.json({ message: 'Settings saved', settings: appSettings });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});