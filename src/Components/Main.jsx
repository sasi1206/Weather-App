import { useState , useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import LoadingScreen from './Loading.jsx';
import AllowLocation from './AllowLocationPage.jsx';


const Main = () => {
  const[Search,setSearch] = useState('');
  const[Loading,setLoading] = useState(false);
  const[Error,setError] = useState({
    is_error : false,
    error_msg:''
  });
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
      ChanceOfRain:0,
      icon:''
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

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setGeoLocationAllowed(true);
      setSearch(`${position.coords.latitude},${position.coords.longitude}`);
    },(err)=> setGeoLocationAllowed(false))
  },[]);

  useEffect(()=>{
    if(GeoLocationAllowed){
      Today();
    }
  },[GeoLocationAllowed])// eslint-disable-line react-hooks/exhaustive-deps

  const FetchingData = async ()=>{
      const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d030628776504a54a10150417241705&q=${Search}&days=2`);
      return data;
  }

  const Today = async ()=>{
    if(Search === ''){
      console.log(Search);
      setError({
        ...Error,
        is_error:true,
        error_msg: "Please Enter a value"
      })
    }
    else{
    setLoading(true);
    try{
      const data = await FetchingData();
      console.log(data);
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
          ChanceOfRain:forecast.forecastday[0].day.daily_chance_of_rain,
          icon:current.condition.icon
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
    }catch(err){
      setError({
        ...Error,
        is_error: true,
        error_msg:"Location unavailable"
      });
    }finally{
      setLoading(false)
    }}
  }

  return (
    <>
    <>{Loading && GeoLocationAllowed && <LoadingScreen />}</>
    { GeoLocationAllowed  && !Loading ? (
        <div className="container">
            <div className="location-container">
                <div className="search">
                    <form>
                        <input 
                        type="text"
                        id="search-box"
                        placeholder="Enter a city or country name"
                        value={Search}
                        onChange={(e)=>{setSearch(e.target.value); setError(false)}}
                        />
                        <button className="search-button" onClick={(e)=>{
                          e.preventDefault();
                          Today();
                        }}><img src="/Imgs/search.png" className="search-img" alt="icon"/></button>
                        <div className={Error.is_error ? 'error-container' : 'none'}>
                        <span>{Error.error_msg}</span>
                        </div>
                    </form>
                </div>
                <div className="location-details">
                    <div className="deg">
                        <img src={WeatherDeatils.Weather.icon} alt="icon" id="icon"/>
                        <p className="degree"><span className="span">{WeatherDeatils.Weather.Degree}</span><span className="o">o</span><span className="C">C</span></p>
                        <p id="weather">{WeatherDeatils.Weather.CurrentWeather}</p>
                    </div>
                    <div className="line"></div>
                    <div className="h-d-t">
                        <p className="date">{ format(new Date(),"dd-MMMM-yyyy")}</p>
                        <p><span className="day">{ format(new Date(),"eeee")},</span><span className="time">{ format(new Date(),'hh:mm a')}</span></p>
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
      ) : <AllowLocation /> }
    </>
  )
}

export default Main