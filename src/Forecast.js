import { useEffect, useState } from "react"
import handleDate from "./handleDate"
import { useMediaQuery } from 'react-responsive';


const Forcast = ({weather}) => {

    const [dailyForecast, setDailyForecast] = useState([])
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const handleForecast = (arr) => {
        arr.forEach((day) => {
            const minTemp = day.temp.min
            const maxTemp = day.temp.max
            const icon = day.weather[0].icon
            const date = handleDate(day.dt)

            // i.push({ minTemp, maxTemp, icon, date })
            setDailyForecast(prev => [...prev, { minTemp, maxTemp, icon, date }])
        })        
    }

    useEffect(() => {
        setDailyForecast([])
        handleForecast(weather.slice(1))
    }, [weather])

    return ( 
        <div className="forecast">
            <div className="forecastTitle">
                <h1>Forecast</h1>
                <span></span>
            </div>
            <ul className="dailyForecast">
                { dailyForecast.length !== 0 && dailyForecast.map((day, i) => (
                    <li className="dayForecast" key={i}>
                        { !isTabletOrMobile ? 
                            <h3>{day.date.dayShort}</h3> :
                            <h3>{day.date.day}</h3> }
                        <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt=""/>
                        <div className="tempMinMax">
                            <p className="min">{day.minTemp | 0}°</p>
                            <p className="max">{day.maxTemp | 0}°</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
     );
}
 
export default Forcast;