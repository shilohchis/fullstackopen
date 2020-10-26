import axios from 'axios';

export const getCountries = async() => {
    try {
        return await axios.get('https://restcountries.eu/rest/v2/all');
    } catch (e) {
        console.log('error fetch countries', e);
        alert("Error occured");
    }
};

export const getWeatherByCountry = async(name) => {
    try {
        return await axios.get(`http://api.weatherstack.com/current?access_key=${ process.env.REACT_APP_API_KEY }&query=${ name }`);
    } catch (e) {
        console.log('error fetch weather', e);
        alert("Error occured");
    }
};
