import React,{useState, useEffect} from "react"

// Components
import Form from "../../Components/Home/Form";
import Temperature from "../../Components/Temperature/Temperature";

// Assets & styles
import "./Home.style.css";
import sky from "../../Assets/images/sky.jpg";


const Home = ()=>{
  const [cityName, setCityName] = useState();
  const [searchCity, setSearchCity] =useState();
  const [latlng, setLatlng] = useState(null);
  const [apiInformation, setApiInformation] = useState();
    
  const handleCityName = ({value}) => {
    setCityName(value);
  }
  const handleSearchCity = () => {
    setSearchCity(cityName);
  }
  useEffect(() => {
    const handleCityCoor = async ()=>{
      const answerApiReservamos = await fetch ('https://search.reservamos.mx/api/v2/places')
      const response = await answerApiReservamos.json()
      setApiInformation(response)
    }
    handleCityCoor();
  }, [])

  useEffect(() => {
    if(apiInformation){
      const citieslist = document.getElementById("cities")
      citieslist.innerHTML = '';
      apiInformation.forEach(element => {
        const option = document.createElement('option')
          if(element.result_type === 'city' ){
            option.value = element.city_name;
          }
        citieslist.appendChild(option)
      });
    }
  }, [apiInformation]);

  useEffect(() => {
    if(searchCity && apiInformation){
        let lat;
        let lng;
        let city;
        apiInformation.forEach(element => {
          if(element.city_name === cityName ){
            lat = element.lat;
            lng = element.long;
            city = element.city_name;
          }
        });
        setLatlng({
          lat,
          lng,
          city
        })
      }
  }, [searchCity, apiInformation, cityName]);

  return(
    <>
    <section className="p-top">
      <img className="border md:w-10/12 rounded-3xl background" src={sky}  alt="background"/>
      <div className="flex justify-center">
        <div className="w-9/12 md:w-7/12 pt-6">
          <Form
            handleCityName={handleCityName}
            handleSearchCity={handleSearchCity}
            cityName={cityName}
          />
        {latlng?
        <Temperature
          latitude={latlng?.lat}
          long={latlng?.lng}
          city={latlng?.city}/>
        : null }
        </div>
      </div>
    </section>
    </>
  )
}


export default Home