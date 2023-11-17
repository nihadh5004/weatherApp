import React, { useState , useEffect } from "react";
import axios from "axios";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import Snowfall from "react-snowfall";
import "react-rain-animation/lib/style.css";
import { CiSearch } from "react-icons/ci";
import { apiKey } from "../assets/apiKey";
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [city, setCity] = useState("");
  const [cityWeatherData, setCityWeatherData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [minusdegree,setMinusdegree]=useState(false)


  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData({
        country_code: response.data.name,
        coordinate: `${response.data.coord.lon}, ${response.data.coord.lat}`,
        temp: `${response.data.main.temp} °C`,
        minTemp: `${response.data.main.temp_min} °`,
        maxTemp: `${response.data.main.temp_max} °`,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        visibility: response.data.visibility,
        speed: response.data.wind.speed,
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });
      if (response.data.main.temp <0){
        console.log(response.data.main.temp);
        setMinusdegree(true)
      }else{
        setMinusdegree(false)
      }
    } catch (error) {
      toast.error('Please enter a valid city name');
      console.error("Error fetching weather data:", error);
    }
  };
  
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    const fetchCity = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=calicut&units=metric&appid=${apiKey}`
          );
          setWeatherData({
            country_code: response.data.name,
            coordinate: `${response.data.coord.lon}, ${response.data.coord.lat}`,
            temp: `${response.data.main.temp} °C`,
            minTemp: `${response.data.main.temp_min} °`,
            maxTemp: `${response.data.main.temp_max} °`,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            visibility: response.data.visibility,
            speed: response.data.wind.speed,
            main: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          });
          const temperature = parseInt(response.data.main.temp, 10);

          setCityWeatherData({
            country_code: response.data.name,
            temp: `${temperature} `,
          })
          if (response.data.main.temp <0){
            console.log(response.data.main.temp);
            setMinusdegree(true)
          }else{
            setMinusdegree(false)
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchCity();
    
    return () => clearInterval(intervalId);
  }, []); 

  
  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();


  return (
    <div>
        {minusdegree && <Snowfall/>}
        
    <div
  className="bg-cover bg-no-repeat bg-center h-screen  w-full"
  style={{
    backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1400/1*OSBo6euKrh4TwdSchg_Yhw.jpeg')`,
  }}
>

    <div className="flex p-20 ">
        <div className="w-1/2 ">
            
        </div>
      <div className="text-white bg-black p-10  bg-opacity-50 mt-10 w-[510px]  rounded-lg shadow-lg  text-center  ">
       <div className="flex gap-5">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 w-5/6  rounded-lg bg-gray-800 text-white"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2   text-xs text-white rounded"
        >
         <CiSearch size={30} />
 
        </button>
       </div>

      </div>
    </div>
    <div className="flex ">
        <div className="w-1/2 mt-36">
            <h1 className="text-white text-9xl ml-20 ">{cityWeatherData.temp} <span className="text-xl absolute mt-0 ">o <span className="mt-1 font-bold ml-1 text-5xl absolute">C</span></span></h1>
            <h1 className="text-white ml-20 text-3xl font-bold uppercase">{cityWeatherData.country_code}</h1>
            <h1 className="text-white ml-20 text-xs mt-2">{formattedTime}   | {formattedDate}</h1>
        </div>

      <div className="text-white bg-black p-8 rounded-lg  bg-opacity-50 w-1/3    ">
        <div className="flex justify-between">
            <div>
            <h1 className="text-4xl uppercase font-bold ml-5">{weatherData.country_code}</h1>
            </div>
            <div className="flex text-white">
                    <FaLongArrowAltUp />
                    <p>{weatherData.maxTemp}</p>
                    <FaLongArrowAltDown />
                    <p>{weatherData.minTemp}</p>
            </div>
        </div>
        
        <div >
            <div className="mt-3 flex  font-semibold justify-between border-t border-gray-500 py-1 text-lg">
                <h1 className="ml-5 mt-3" >
                    Temperature  
                </h1>
                <h1 className="ml-5 mt-3 mr-10" >
                    {weatherData.temp}
                </h1>
            </div>
            <div className="mt-3 flex  font-semibold justify-between border-t border-gray-500 py-1 text-lg">
                <h1 className="ml-5 mt-3" >
                    Humidity  
                </h1>
                <h1 className="ml-5 mt-3 mr-10" >
                    {weatherData.humidity}%
                </h1>
            </div>
            <div className="mt-3 flex  font-semibold justify-between border-t border-gray-500 py-1 text-lg">
                <h1 className="ml-5 mt-3" >
                    Visibility  
                </h1>
                <h1 className="ml-5 mt-3 mr-10" >
                    {weatherData.visibility} mi
                </h1>
            </div>
            <div className="mt-3 flex  font-semibold justify-between border-t border-gray-500 py-1 text-lg">
                <h1 className="ml-5 mt-3" >
                    Wind Speed  
                </h1>
                <h1 className="ml-5 mt-3 mr-10" >
                    {weatherData.speed} km/h
                </h1>
            </div>
            <div className="mt-3 flex  font-semibold justify-between border-t border-gray-500 py-1 text-lg">
                <h1 className="ml-5 mt-3" >
                    Description  
                </h1>
                <h1 className="ml-5 mt-3 mr-10 " >
                    {weatherData.description} 
                </h1>
            </div>
            
            
        </div>
        

       
      </div>
    </div>


    
    </div>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </div>
  );
}

export default Home;
