
const getVisitorCity = async () => {

    let i;
    let error = null;

    await fetch('http://jsonip.com')
        .then(res => res.json())
        .then(ip => fetch('http://ip-api.com/json/', ip))
        .then(res =>  res.json())
        .then(result => {
            i = result.city
            error = null
        })
        .catch(err => {
            console.log(err)
            error = 'We could not find your current city'
        })

    return {i, error};
}

export default getVisitorCity;