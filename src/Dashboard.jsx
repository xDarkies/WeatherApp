import './Dashboard.css';
import Card from './Card'
function DashBoard({weatherData}){
if(!weatherData)return;

  return (
    <>  
        <div id="Dashboard">
            <Card weatherData={weatherData} height="320px" width="320px">Weather</Card>
            <Card height="320px" width="500px">Chart</Card>
        </div>
    </>
  );
}
export default DashBoard;