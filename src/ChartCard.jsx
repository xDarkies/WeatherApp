import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import LineChart from "./LineChart";

Chart.register(CategoryScale);

function ChartCard({ weatherData, days, active }) {
  const [temp, setTemp] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (!weatherData || !days || !active) return;

    const fetchData = async () => {
      const url = `http://127.0.0.1:2137/hourly-forecast?lat=${weatherData.latitude}&lng=${weatherData.longitude}&option=${active}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        let tempData = [];
        switch (active) {
          case "temperature":
            tempData = data.hourly.temperature_2m;
            break;
          case "quantityOfWater":
            tempData = data.hourly.precipitation;
            break;
          case "probOfPrecipitation":
            tempData = data.hourly.precipitation_probability;
            break;
          case "visibility":
            tempData = data.hourly.visibility;
            break;
          case "pressure":
            tempData = data.hourly.surface_pressure;
            break;
          case "windSpeed":
            tempData = data.hourly.wind_speed_10m;
            break;
          default:
            break;
        }

        const limitedTemp = tempData.slice(0, days *24 );
        const limitedLabels = data.hourly.time.slice(0, days*24).map((label) => label.replace("T", " "));;
        
        const lT = [];
        const lL = [];
        let j = 0;
        for(let i = 0;i < days * 24;i=i+4){
          lT[j] = limitedTemp[i];
          lL[j] = limitedLabels[i];
          j++;
        }
        console.log(lL);
        setTemp(lT);
        setLabels(lL);
      } catch (error) {
        console.error("Błąd pobierania z backendu:", error);
      }
    };

    
    

    fetchData();
  }, [weatherData, days, active]); // <- reaguje na zmianę tych trzech rzeczy

  const chartData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: active,
          data: temp,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.4,
        },
      ],
    }),
    [labels, temp]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: active,
        color: "white",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white", font: { size: 14 } },
        grid: {
          color: "#7e7e7eff",
          lineWidth: 1,
        },
      },
      y: {
        ticks: { color: "white", font: { size: 14 } },
        grid: {
          color: "#7e7e7eff",
          lineWidth: 1,
          borderColor: "white",
        },
      },
    },
  };

  // 🔹 wykres o stałej wielkości 600x400 px
  return (
    <div style={{ width: "600px", height: "400px" }}>
      <LineChart chartData={chartData} chartOptions={chartOptions} />
    </div>
  );
}

export default ChartCard;
