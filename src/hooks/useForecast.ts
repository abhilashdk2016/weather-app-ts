import { ChangeEvent, useEffect, useState } from "react";
import { forecastType, optionType } from "../types";

const UseForeCast = () => {
  const [loc, setLoc] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLoc(value);
    if(value === '') {
      setOptions([]);
      setCity(null);
      return;
    }
    getSearchOptions(value);
  }
  const getSearchOptions = (value: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      setOptions(data);
    })
    .catch((e) => console.log({ e }));
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  }

  useEffect(() => {
    if(city) {
      setLoc(city.name);
      setOptions([]);
    }
  }, [city]);
  const onSearch = () => {
    if(city) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const forecastData = {
            ...data.city,
            list: data.list.slice(0, 16),
        }
        setForecast(forecastData);
      })
      .catch((e) => console.log({ e }));
    }
  }

  return {
    loc, options, forecast, onOptionSelect, onSearch, handleSearch
  }
}

export default UseForeCast;