const getWeather = async (city) => {

    let cityName;
    let weather;
    let isPending = true;
    let error = null

    // set Your OpenWeatherMap API key here:
    let APIKey = '';

    await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Could not find the city')
            }
        })
        .then(result => {
            if (result.length === 0) {
                throw new Error('Could not find the city')
            }
            cityName = result[0]
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=metric&exclude=hourly,minutely&appid=${APIKey}`)})
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Could not find the city')
                    }
                })
                .then(result => {
                    weather = result
                    isPending = false
                    error = null
                })
                .catch(err => {
                    console.log(err)
                    error = err.message
                    isPending = false
                })
                
    return { cityName, weather, isPending, error};
};

export default getWeather;