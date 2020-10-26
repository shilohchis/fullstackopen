import React, { useEffect, useState } from 'react';
import HeaderType from './HeaderType';
import { getWeatherByCountry } from '../services/api';

const CountryDetail = ({ data, isSingle = false }) => {
    const [weather, setWeather] = useState({});

    const getWeather = async() => {
        const {data: { current: {
            temperature,
            weather_icons,
            wind_speed,
            wind_dir
        }}} = await getWeatherByCountry(data.name);
        setWeather({
            temperature,
            weather_icons,
            wind_speed,
            wind_dir
        });
    }

    useEffect(() => {
        if(isSingle) {
            getWeather();
        }
    }, []);

    return (
        <div>
            <HeaderType number={1} text={ data.name }/>
            <p>capital { data.capital }</p>
            <p>population { data.population }</p>
            <HeaderType number={2} text="Spoken languages"/>
            <ul>
                {
                    data.languages.map(item => <li key={ item.name }>{ item.name }</li>)
                }
            </ul>
            <img src={ data.flag } alt="flag" style={{ width: 100 }}/>
            { isSingle
                ? <>
                    <HeaderType number={2} text={`Weather in ${data.name}`}/>
                    <p>temperature: { weather.temperature } Celcius</p>
                    <img src={ weather.weather_icons } alt="flag" style={{ width: 50 }}/>
                    <p>wind: { weather.wind_speed } mph direction { weather.wind_dir }</p>
                </>
                : null
            }
        </div>
    );
};

export default CountryDetail;
