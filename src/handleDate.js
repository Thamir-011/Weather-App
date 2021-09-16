const handleDate = (code) => {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(0);

    d.setUTCSeconds(code)

    const date = d.getDate();
    const day = days[d.getDay()]
    const dayShort = day ? day.substr(0, 3) : '';
    

    return {date, day, dayShort}
}
 
export default handleDate;