import React from "react";

const DayCard = ({max_temp, icon,min_temp})=>{
  return(
    <>
      <div className="flex md:flex-col md:w-1/4
      justify-around 
      items-center p-4 bg-blue-100
      m-px md:m-0
      group-hover:bg-gray-300">
        <p>day week</p>
        <img className="-m-3.5" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"/>
        <p>{max_temp} °C / {min_temp} °C</p>
      </div>
    </>
 )
}

export default DayCard