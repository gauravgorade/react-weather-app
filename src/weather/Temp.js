
import { useEffect, useState } from "react";
import "./style.css"
import WeatherCard from "./WeatherCard";


function Temp() {


    const [SearchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});


    const getWeatherInfo = async () => {

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${SearchValue}&units=metric&appid=c02a787f1a574f1a2a2a223cabfc891b`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>

            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm"
                        value={SearchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button  onClick={getWeatherInfo} className="searchButton" type="button">Search</button>
                </div>
            </div>
            <WeatherCard tempInfo= {tempInfo }/>

        </>
    )
}

export default Temp;