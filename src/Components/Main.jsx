import { useState , useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import LoadingScreen from './Loading.jsx';


const Main = () => {
  const[Search,setSearch] = useState('');
  const[Loading,setLoading] = useState(false);
  const[GeoLocationAllowed,setGeoLocationAllowed] = useState(false);
  const[WeatherDeatils,setWeatherDetails] = useState({
    Weather:{
      Degree:0,
      CurrentWeather:null,
      Wind:0,
      Humidity:0,
      FeelsLike:0,
      UVIndex:0,
      Pressure:0,
      ChanceOfRain:0
    },
    Location:{
      City:'',
      Region:'',
      Country:''
    },
    Astro:{
      Sunrise:null,
      Sunset:null,
      Moonrise:null,
      Moonset:null
    }
  });

  const fetchingData = async ()=>{
    try{
      setLoading(true);
      const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d030628776504a54a10150417241705&q=${Search}&days=2`);
      const { current , forecast , location } = data;
      setWeatherDetails({
        ...WeatherDeatils,
        Weather:{
          Degree:current.temp_c,
          CurrentWeather:current.condition.text,
          Wind:current.wind_kph,
          FeelsLike:current.feelslike_c,
          Humidity:current.humidity,
          UVIndex:current.uv,
          Pressure:current.pressure_mb,
          ChanceOfRain:forecast.forecastday[0].day.daily_chance_of_rain
        },
        Location:{
          City:location.name,
          Region:location.region,
          Country:location.country
        },
        Astro:{
          Sunrise:forecast.forecastday[0].astro.sunrise,
          Sunset:forecast.forecastday[0].astro.sunset,
          Moonrise:forecast.forecastday[0].astro.moonrise,
          Moonset:forecast.forecastday[0].astro.moonset
        }
      });
    }
    catch(err){
      console.error(err);
    }
    finally{
      setTimeout(()=>setLoading(false),3000);
    }
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setSearch(`${position.coords.latitude},${position.coords.longitude}`);
      setGeoLocationAllowed(true);
    },(err)=> console.log(err))
  },[]);

  useEffect(()=>{
    if(GeoLocationAllowed){
      fetchingData();
    }
  },[GeoLocationAllowed])
  return (
    <>
    <div className="container">
        <div className="location-container">
            <div className="search">
                <form>
                    <input 
                    type="text"
                    id="search-box"
                    placeholder="Enter a city or country name"
                    value={Search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button className="search-button" onClick={(e)=>{
                      e.preventDefault();
                      fetchingData();
                    }}><img src="/Imgs/search.png" className="search-img"/></button>
                    <div className="error-container">
                    <FaInfoCircle />
                    <span>Please Enter a Value</span>
                    </div>
                </form>
            </div>
            <div className="location-details">
                <div className="deg">
                    <img src={`/Imgs/${WeatherDeatils.Weather.CurrentWeather}.png`} alt="icon" id="icon"/>
                    <p className="degree"><span className="span">{WeatherDeatils.Weather.Degree}</span><span className="o">o</span><span className="C">C</span></p>
                    <p id="weather">{WeatherDeatils.Weather.CurrentWeather}</p>
                </div>
                <div className="line"></div>
                <div className="h-d-t">
                    <p className="date">21-July-2023</p>
                    <p><span className="day">Friday,</span><span className="time">12:44 PM</span></p>
                </div>
                <div className="location">
                    <p>{WeatherDeatils.Location.City}</p>
                    <p>{WeatherDeatils.Location.Region+','+WeatherDeatils.Location.Country}</p>
                </div>
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
                    <p>{WeatherDeatils.Weather.Wind} km/h</p>
                </div>
                <div className="Humadity">
                    <p>Humidity</p>
                    <p>{WeatherDeatils.Weather.Humidity} %</p>
                </div>
                <div className="Feels-like">
                    <p>Feel's Like</p>
                    <p className="degree"><span className="span">{WeatherDeatils.Weather.FeelsLike}</span><span className="o">o</span><span className="C">C</span></p>
                </div>
                <div className="UV-index">
                    <p>UV Index</p>
                    <p>{WeatherDeatils.Weather.UVIndex}</p>
                </div>
                <div className="Pressure">
                    <p>Pressure</p>
                    <p>{WeatherDeatils.Weather.Pressure} mb</p>
                </div>
                <div className="Chance-of-rain">
                    <p>Chance of rain</p>
                    <p>{WeatherDeatils.Weather.ChanceOfRain} %</p>
                </div>
                <div className="sun">
                    <p>Sun</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>Rise</td>
                            <td>:</td>
                            <td className="rise">{WeatherDeatils.Astro.Sunrise}</td>
                        </tr>
                        <tr>
                            <td>Set</td>
                            <td>:</td>
                            <td className="set">{WeatherDeatils.Astro.Sunset}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="moon">
                    <p>Moon</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>Rise</td>
                            <td>:</td>
                            <td className="rise">{WeatherDeatils.Astro.Moonrise}</td>
                        </tr>
                        <tr>
                            <td>Set</td>
                            <td>:</td>
                            <td className="set">{WeatherDeatils.Astro.Moonset}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <>{Loading && <LoadingScreen />}</>
    </>
  )
}

export default Main