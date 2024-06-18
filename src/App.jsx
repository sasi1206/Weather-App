import { useEffect,useState } from "react";

function App() {










  
  return (
    <div className="container">
      <div className="location-container">
        <div className="search">
          <form>
            <input 
              type="text"
            />
            <button className="search-button"><img src="../Imgs/search.png" className="search-img"/></button>
            <div className="error-container">
              <img
                src="../Imgs/info.png"
              />
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
            <p className="degree"><span className="span">23</span><span className="o">o</span><span className="C">C</span></p>
            <p className="weather">Mostly Cloudy</p>
          </div>
          <div className="line"></div>
          <div className="h-d-t">
            <p className="date">21-July-2023</p>
            <p><span className="day">Friday,</span><span className="time">12:44 PM</span></p>
          </div>
          <p className="location">Madurai</p>
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
            <p>6 km/h</p>
          </div>
          <div className="Humadity">
            <p>Humidity</p>
            <p>69%</p>
          </div>
          <div className="Feels-like">
            <p>Feel's Like</p>
            <p className="degree"><span className="span">23</span><span className="o">o</span><span className="C">C</span></p>
          </div>
          <div className="UV-index">
            <p>UV Index</p>
            <p>3</p>
          </div>
          <div className="Pressure">
            <p>Pressure</p>
            <p>1000 mb</p>
          </div>
            <div className="Chance-of-rain">
              <p>Chance of rain</p>
              <p>70%</p>
            </div>
            <div className="sun">
              <p>Sun</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">5:17 AM</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">5:17 AM</td>
                </tr>
              </table>
            </div>
            <div className="moon">
              <p>Moon</p>
              <table>
                <tr>
                  <td>Rise</td>
                  <td className="rise">5:17 AM</td>
                </tr>
                <tr>
                  <td>Set</td>
                  <td className="set">5:17 AM</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
