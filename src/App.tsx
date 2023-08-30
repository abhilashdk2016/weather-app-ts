
import './App.css'
import { Box, styled } from '@mui/material';
import { useState, ChangeEvent, useEffect } from 'react';
import { optionType } from './types';
import SearchComponent from './components/Search';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(153deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)`,
  height: '100vh',
  width: '100vw'
});

const App = (): JSX.Element => {
  const [loc, setLoc] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);
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
    });
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
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_WEATHER_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
    }
  }
  return (
    <StyledBox>
      <SearchComponent loc={loc} options={options} onInputChange={handleSearch} onOptionSelect={onOptionSelect} onSubmit={onSearch} />
    </StyledBox>
  )
}

export default App;
