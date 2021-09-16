import { useEffect, useState } from 'react'
import getWeather from './getWeather';
import getVisitorCity from './getVisitorCity';
import handleDate from './handleDate';
import Forecast from './Forecast'


function App() {


  const [weather, setWeather] = useState()
  const [city, setCity] = useState()
  const [date, setDate] = useState({})
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState()
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    getVisitorCity()
    .then(res => {
      if(res.error) {
        setError(res.error)
      } else {
        fetchWeather(res.i)
      } 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchWeather = (searchCity) => {
      getWeather(searchCity)
        .then(res => {
          setError(res.error)
          setWeather()
            if (error == null && res.weather !== undefined) {
              setCity(res.cityName)
              setWeather(res.weather)
              setIsPending(res.isPending)
              return handleDate(res.weather.current.dt)
            }
        })
      .then(res => setDate(res))
  }



  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(searchValue)
    }
  }


  return (
    <div className="App">
      <div className="app-container" style={{backgroundImage: 'url(/background.jpg)'}}>
        <div className="content">
          <div className="search-sec">
            <div className="searchBar">
              <input
                type="text"
                placeholder='City'
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={(e) => handleSearch(e)}
                />
              <i className="fas fa-search"></i>
            </div>
          </div>

          { error ? 
            error === 'We could not find your current city' ?
            <div className='error-container'>
              <div className='message'>{error}</div>
              <div className='message'>Use the search bar above to search by City Name</div>
            </div> 
                : <div className='message'>{error}</div> 
            : isPending ? 
              <div className='message'>Loading..</div> 
              : ''}
          { weather && (
            <div className="weather-sec">
              <div className="current">
                <div className="date">
                  <h1>{ date && date.dayShort} { date && date.date}</h1>
                  <p className='location'> <i className="fas fa-map-marker-alt"></i> { city && city.name}, { city && city.country}</p>
                </div>
                <div className="weather">
                  <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="icon"/>
                  <p>{weather.current.weather[0].main}</p>
                </div>
                <div className="temperature">
                  <h1>{weather.current.temp | 0}°</h1>
                  <p>Feels like {weather.current.feels_like | 0}°</p>
                </div>
              </div>
              <Forecast weather={weather.daily} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
