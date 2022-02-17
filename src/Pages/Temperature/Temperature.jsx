import React,{useState,useEffect} from 'react'
import DayCard from '../../Components/Home/DayCard'

const Temperature = ({latitude, long, city})=>{

    const [weatherApi, setWeatherApi]= useState()

    useEffect(() => {
        const handleCityWeather = async()=>{
            const apiWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${long}&units=metric&exclude=hourly&appid=f414ea4cda4b3c1ee3c2896e8ca2e32c`
            const response = await fetch(apiWeather)
            const result = await response.json();
            setWeatherApi(result);
        }
        handleCityWeather()
    }, [latitude,long])

    console.log(weatherApi)
    return(
        <>
        <div className="md:flex justify-between">
        <div className="md:w-1/2 flex flex-col 
          justify-center 
          items-center p-4 bg-slate-50/50
          rounded-3xl group
          group-hover:bg-gray-300">
        <h2 className="font-extrabold text-center text-2xl">{city}</h2>
        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{weatherApi?.current.temp} °C</p>
        <img className="-m-3.5" src={`http://openweathermap.org/img/wn/${weatherApi?.daily[0].weather[0].icon}@2x.png`} alt="icon"/>
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        <p className="text-xl">{weatherApi?.daily[0]?.temp.max}°C / {weatherApi?.daily[0]?.temp.min}°C</p>   
        </div>     
        </div>

        <div className=" md:w-1/2 bg-blue-300/50 rounded-3xl group">
        <h2 className="font-bold text-lg p-3">Max/Min Temperature Today and Next 7 days</h2>
        <div className="md:flex flex-wrap justify-around p-1">
        {weatherApi? 
        (weatherApi.daily.map((day, key) => (
          <DayCard
            key={key}
            max_temp={day.temp.max}
            min_temp={day.temp.min}
            icon={day.weather[0].icon}
            />
        )) ): null
    }
            </div>
    </div>
    </div>
        </>
    )
}

export default Temperature