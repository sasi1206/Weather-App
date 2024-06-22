import { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import axios from "axios";

function App() {
  const[Search,setSearch] = useState('');
  const[Degree,setDegree] = useState(0);
  const[Weather,setWeather] = useState('');
  const[Wind,setWind] = useState(0);
  const[Humidity,setHumidity] = useState(0);
  const[FeelsLike,setFeelsLike] = useState(0);
  const[UVIndex,setUVIndex] = useState(0);
  const[Pressure,setPressure] = useState(0);
  const[ChanceOfRain,setChanceOfRain] = useState(0);
  const[Sunrise,setSunrise] = useState('');
  const[Sunset,setSunset] = useState('');
  const[Moonrise,setMoonrise] = useState('');
  const[Moonset, setMoonset] = useState('');

  const fetchingData = async (e)=>{
    e.preventDefault();
    try{
      const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d030628776504a54a10150417241705&q=${Search}&days=2`);
      console.log(data);
      setDegree(data.current.temp_c);
      setWeather(data.current.condition.text);
      setWind(data.current.wind_kph);
      setHumidity(data.current.humidity);
      setFeelsLike(data.current.feelslike_c);
      setUVIndex(data.current.uv);
      setPressure(data.current.pressure_mb);
      setChanceOfRain(data.forecast.forecastday[0].day.daily_chance_of_rain);
      setSunrise(data.forecast.forecastday[0].astro.sunrise);
      setSunset(data.forecast.forecastday[0].astro.sunset);
      setMoonrise(data.forecast.forecastday[0].astro.moonrise);
      setMoonset(data.forecast.forecastday[0].astro.moonset);
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="location-container">
        <div className="search">
          <form>
            <input 
              type="text"
              id="search-box"
              value={Search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="search-button" onClick={fetchingData}><FaSearch className="search-img"/></button>
            <div className="error-container">
              <FaInfoCircle />
              <span>Please Enter a Value</span>
            </div>
          </form>
        </div>
        <div className="location-details">
          <div className="deg">
            <img src={`/Imgs/${Weather}.png`} alt="icon" id="icon"/>
            <p className="degree"><span className="span">{Degree}</span><span className="o">o</span><span className="C">C</span></p>
            <p id="weather">{Weather}</p>
          </div>
          <div className="line"></div>
          <div className="h-d-t">
            <p className="date">21-July-2023</p>
            <p><span className="day">Friday,</span><span className="time">12:44 PM</span></p>
          </div>
          <p className="location">{Search}</p>
        </div>
      </div>
      <div className="weather">
        <form className="buttons">
          <button className="today">Today</button>
          <button className="tmrw">Tommorrow</button>
        </form>
        <div className="wc">
          <div className="Wind">
            <p>Wind</p>
            <p>{Wind}km/h</p>
          </div>
          <div className="Humadity">
            <p>Humidity</p>
            <p>{Humidity}%</p>
          </div>
          <div className="Feels-like">
            <p>Feel's Like</p>
            <p className="degree"><span className="span">{FeelsLike}</span><span className="o">o</span><span className="C">C</span></p>
          </div>
          <div className="UV-index">
            <p>UV Index</p>
            <p>{UVIndex}</p>
          </div>
          <div className="Pressure">
            <p>Pressure</p>
            <p>{Pressure} mb</p>
          </div>
            <div className="Chance-of-rain">
              <p>Chance of rain</p>
              <p>{ChanceOfRain}%</p>
            </div>
            <div className="sun">
              <p>Sun</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">{Sunrise}</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">{Sunset}</td>
                </tr>
              </table>
            </div>
            <div className="moon">
              <p>Moon</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">{Moonrise}</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">{Moonset}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
