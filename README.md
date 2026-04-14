# EV Monitor React version

A dashboard for monitoring electric vehicle charging

Built with **React (Vite)**, **TypeScript**, and **Tailwind CSS** on the frontend, powered by a **Node.js** backend, and fully containerized using **Docker** for seamless deployment. Supports both dark and light themes.

## Launch
```bash
git clone https://github.com/LilRaime/ev-monitor-react.git
cd ev-monitor-react

cp .env.example .env # Create .env file
```

### Run
```bash
docker-compose up --build -d
```
The dashboard will be available at http://localhost:5173 and the API at http://localhost:3000/api/status.

## Screenshots

![Dark Dashboard](screenshots/dark_dashboard.png)
![Light Dashboard](screenshots/light_dashboard.png)
![Dark Statistic](screenshots/dark_statistic.png)
![Light Statistic](screenshots/light_statistic.png)

### Mobile

<table>
  <tr>
    <td><img src="screenshots/mobile1.png" width="300"/></td>
    <td><img src="screenshots/mobile2.png" width="300"/></td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="screenshots/mobile3.png" width="300"/></td>
    <td><img src="screenshots/mobile4.png" width="300"/></td>
  </tr>
</table>