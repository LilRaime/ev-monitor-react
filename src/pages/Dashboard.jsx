import PowerCard from '../components/cards/PowerCard';
import BatteryCard from '../components/cards/BatteryCard';
import CostCard from '../components/cards/CostCard';
import ChargingCard from '../components/cards/ChargingCard';
import ChartCard from '../components/cards/ChartCard';

export default function Dashboard({ chartData, batteryData }) {
  const currentPower = chartData[chartData.length - 1];
  const currentBattery = batteryData[batteryData.length - 1];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 md:gap-6 relative z-10">
      <PowerCard currentPower={currentPower} />
      <BatteryCard batteryLevel={currentBattery} />
      <CostCard chartData={chartData} />
      <ChargingCard currentPower={currentPower} batteryLevel={currentBattery} />
      <ChartCard chartData={chartData} />
    </div>
  );
}