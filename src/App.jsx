import { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import axios from "axios";

function App() {
  const[Search,setSearch] = useState('');
  const[IsLoading,setIsLoading] = useState(false);
  const[FetchError,setFetchError]= useState(false);
  const[WeatherDetails,setWeatherDetails]=useState({
    Degree: 0,
    Weather:null,
    Wind:0,
    Humadity:0,
    FeelsLike:0,
    UVIndex:0,
    Pressure:0,
    ChanceOfRain:0,
    SunRise:null,
    SunSet:null,
    MoonRise:null,
    MoonSet:null
  });

  const fetchingData = async ()=>{
    try{
      const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d030628776504a54a10150417241705&q=${Search}&days=2`);
      setIsLoading(true);
    }
    catch(err){
      setFetchError(err);
    }
    finally{
      setIsLoading(false);
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
            <button className="search-button"><FaSearch className="search-img" onClick={fetchingData}/></button>
            <div className="error-container">
              <FaInfoCircle />
              <span>Please Enter a Value</span>
            </div>
          </form>
        </div>
        <div className="location-details">
          <div className="deg">
            <img
              src="../Imgs/cloudy.png"
              id="icon"
            />
            <p className="degree"><span className="span">{WeatherDetails.Degree}</span><span className="o">o</span><span className="C">C</span></p>
            <p className="weather">{WeatherDetails.Weather}</p>
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
            <p>{WeatherDetails.Wind}km/h</p>
          </div>
          <div className="Humadity">
            <p>Humidity</p>
            <p>{WeatherDetails.Humadity}%</p>
          </div>
          <div className="Feels-like">
            <p>Feel's Like</p>
            <p className="degree"><span className="span">{WeatherDetails.FeelsLike}</span><span className="o">o</span><span className="C">C</span></p>
          </div>
          <div className="UV-index">
            <p>UV Index</p>
            <p>{WeatherDetails.UVIndex}</p>
          </div>
          <div className="Pressure">
            <p>Pressure</p>
            <p>{WeatherDetails.Pressure} mb</p>
          </div>
            <div className="Chance-of-rain">
              <p>Chance of rain</p>
              <p>{WeatherDetails.ChanceOfRain}%</p>
            </div>
            <div className="sun">
              <p>Sun</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">{WeatherDetails.SunRise}</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">{WeatherDetails.SunSet}</td>
                </tr>
              </table>
            </div>
            <div className="moon">
              <p>Moon</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">{WeatherDetails.MoonRise}</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">{WeatherDetails.MoonSet}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
