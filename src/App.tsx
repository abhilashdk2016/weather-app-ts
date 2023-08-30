
import './App.css'
import { Box, styled } from '@mui/material';
import SearchComponent from './components/Search';
import UseForeCast from './hooks/useForecast';
import ForeCast from './components/ForeCast';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(153deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)`,
  height: '100vh',
  width: '100vw'
});

const App = (): JSX.Element => {
  const { loc, options, forecast, onOptionSelect, onSearch, handleSearch } = UseForeCast();
  return (
    <>
      <StyledBox sx={{ height: { xs: '100%', sm: '100%', md: '100vh' }}}>
        {
          forecast 
          ? <ForeCast data={forecast} />
          : <SearchComponent loc={loc} options={options} onInputChange={handleSearch} onOptionSelect={onOptionSelect} onSubmit={onSearch} />
        }
      </StyledBox>
    </>
  )
}

export default App;
