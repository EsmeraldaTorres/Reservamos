import React,{useState, useEffect} from "react"
import Form from "../../Components/Home/Form"
import Temperature from "../Temperature/Temperature"
import "./Home.style.css"
import sky from "../../Assets/images/sky.jpg"
import Header from "../../Components/Home/Custom/Header"

const Home = ()=>{
    const [cityName, setCityName] = useState()
    const [serachCity, setSearchCity] =useState()
    const [latlng, setLatlng] = useState(null)
    const [apiInformation, setApiInformation] = useState()
    
    const handleCityName = ({value}) => {
        setCityName(value);
    }
    const handleSearchCity = () => {
        setSearchCity(cityName)
    }
    
    console.log(cityName)
    useEffect(() => {
        const handleCityCoor = async ()=>{
        const answerApiReservamos = await fetch
        ('https://search.reservamos.mx/api/v2/places')
        const response = await answerApiReservamos.json()
        setApiInformation(response)
    }
    handleCityCoor();
}, [])

    useEffect(() => {
    console.log(apiInformation);
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
        if(serachCity && apiInformation){
            var lat;
            var lng;
            var city;
            apiInformation.forEach(element => {
                if(element.city_name === cityName ){
                    lat = element.lat;
                    lng = element.long;
                    city = element.city_name;
                }
            });
            console.log(lat);
            console.log(lng);
            setLatlng({
                lat,
                lng,
                city
            })
        }
    }, [serachCity]);


  return(
      <>
    <section className="p-top">
    <img className="border md:w-10/12 rounded-3xl"src={sky}  alt="img1" className="background"/>
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
      city={latlng?.city}/> : null }
    </div>
    </div>
    </section>
    </>
  )
}


export default Home