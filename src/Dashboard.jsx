import './Dashboard.css';
import Card from './Card'
import ChartCard from './ChartCard';
function DashBoard({weatherData,days,active}){
if(!weatherData)return;
if(!days)return;
if(!active)return;


  return (
    <>  
        <div id="Dashboard">
            <Card weatherData={weatherData} height="320px" width="320px">Weather</Card>
            <ChartCard weatherData={weatherData} days={days} active={active} height="320px" width="500px">Chart</ChartCard>
        </div>
    </>
  );
}
export default DashBoard;