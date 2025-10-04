import './Card.css'
import moon from './assets/full-moon.png'
import sun from './assets/sun.png'
import sunrise from './assets/sunset.png'
import sunset from './assets/sunset.png'


export default function Card(props){
    if(!props.weatherData) return
    
    return(
        <>
            <div id="Card" style={{height:props.height,width:props.width}}>
                <h2>{props.children}</h2>
                <p>Temperature {props.weatherData.daily.temperature_2m_max[0] + " " + props.weatherData.daily_units.temperature_2m_max}</p>
                <p>Rain sum {props.weatherData.daily.rain_sum[0]+ ' ' + props.weatherData.daily_units.rain_sum}</p>
                <p>Wind speed {props.weatherData.daily.wind_speed_10m_max[0]+ " " + props.weatherData.daily_units.wind_speed_10m_max}</p>
                <p>Visibility {props.weatherData.daily.visibility_mean[0] + ' ' + props.weatherData.daily_units.visibility_mean}</p>
                <p>Sunrise {props.weatherData.daily.sunrise[0].slice("-5")}</p>
                <p>Sunset {props.weatherData.daily.sunset[0].slice("-5")}</p>
            </div>   
        </>
    )

}