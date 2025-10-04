import './Card.css'
import moon from './assets/full-moon.png'
import sun from './assets/sun.png'
import sunrise from './assets/sunrise.png'
import sunset from './assets/sunset.png'
import cloud from './assets/cloud.png'
import sunWithCloud from './assets/clouds-and-sun.png'

export default function Card(props){
    if(!props.weatherData) return
    
    let whichImage = ()=>{
        let sunrise = props.weatherData.daily.sunrise[0].slice("-5");
        let sunset =  props.weatherData.daily.sunset[0].slice("-5");
        let clouds = props.weatherData.daily.cloud_cover_mean[0];
        
        let t = new Date();
        if(Number(sunrise.slice(0,2)) < t.getHours() && t.getHours() < Number(sunset.slice(0,2))) {
           if(clouds > 60) return 3
           else if(clouds > 20) return 2;
           return 1;
        }
        else if((Number(sunrise.slice(-2)) < t.getMinutes() && Number(sunrise.slice(0,2)) == t.getHours()) || (t.getMinutes() < Number(sunset.slice(-2)) && Number(sunrise.slice(0,2)) > t.getHours())){
            
            if(clouds > 60) return 3
            else if(clouds > 20) return 2;
            return 1;
        } 
        return 0;
    }
    let imageToShow = (num)=>{
        switch(num){
            case 0:
                return <img src={moon} height='100px' width='100px' />;
                break;
            case 1:
                return <img src={sun} height='100px' width='100px' />;
                break;
            case 2:
                return <img src={sunWithCloud} height='100px' width='100px' />;
                break;
            case 3:
                return <img src={cloud} height='100px' width='100px' />;
                break;
            default:
                return <img src={sun} height='100px' width='100px' />;
        }
    }

    return(
        <>
            <div id="Card" style={{height:props.height,width:props.width}}>
                <h2 style={{textAlign:"center"}}>{props.children}</h2>
                {imageToShow(whichImage())}
                
                <div style={{float:"left",marginLeft:"20px",marginTop:"15px"}}>
                    <p>Temperature {props.weatherData.daily.temperature_2m_max[0] + " " + props.weatherData.daily_units.temperature_2m_max}</p>
                    <p>Rain sum {props.weatherData.daily.rain_sum[0]+ ' ' + props.weatherData.daily_units.rain_sum}</p>
                    <p>Wind speed {props.weatherData.daily.wind_speed_10m_max[0]+ " " + props.weatherData.daily_units.wind_speed_10m_max}</p>
                    <p>Visibility {props.weatherData.daily.visibility_mean[0] + ' ' + props.weatherData.daily_units.visibility_mean}</p>
                </div>

                <div style={{clear:"both"}}></div>
                <br></br>
                <br></br>
                <br></br>
                <span style={{display:'flex',justifyContent:"center"}}><img src={sunrise} width="25px" height="25px"/>Sunrise {props.weatherData.daily.sunrise[0].slice("-5")}</span><br></br>
                <span style={{display:'flex',justifyContent:"center"}}><img src={sunset} width="25px" height="25px"/>Sunset {props.weatherData.daily.sunset[0].slice("-5")}</span>
            </div>   
        </>
    )

}