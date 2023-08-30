import { Box, styled } from "@mui/material"
import { forecastType } from "../types";
import { formatAMPM, getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../helpers";
import Degree from "./Degree";
import Sunrise from "../icons/Sunrise";
import Sunset from "../icons/Sunset";
import Tile from "./Tile";
// import Tile from "./Tile";
type Props = {
    data: forecastType | null
}

const SunGlassSection = styled(Box)({
    background: `rgba( 255, 255, 255, 0.2 )`,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    width: '40%',
    color: "black",
    padding: '15px',
    marginBottom: '5px'
  });

const ForeCast = ({ data } : Props ): JSX.Element => {
  const today = data?.list[0]
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '500px', maxWidth: '500px' }}>
        <section style={{ textAlign: 'center', width: '100%'}}>
            <h2 style={{ fontWeight: 'bolder', color: 'black', margin: 0}}>{data?.name}, <span style={{ fontWeight: 'lighter'}}>{data?.country}</span></h2>
            <h1 style={{ fontWeight: 'bolder', color: 'black', margin: 0}}><Degree temp={Math.round(today!.main.temp)} /></h1>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <p style={{ color: 'black', margin: 0 }}>{today!.weather[0].main} {today!.weather[0].description}</p>
                <p style={{ color: 'black', margin: 0 }}>
                    H: <Degree temp={Math.round(today!.main.temp_max)} /> &nbsp;
                    L: <Degree temp={Math.round(today!.main.temp_min)} />
                </p>
            </Box>
        </section>
        <section style={{ display: 'flex', overflowX: 'scroll', width: '100%' }}>
            {data?.list.map((item, i) => {
                return <Box key={i}>
                    <p style={{ margin: 0 }}>{i === 0 ? 'Now' : formatAMPM(new Date(item.dt * 1000))}</p>
                    <img style={{ margin: 0 }}
                        alt={`weather-icon-${item.weather[0].description}`}
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    <p style={{ fontSize: 'small', fontWeight: 'bold', margin: 0}}>
                        <Degree temp={Math.round(item.main.temp)} />
                    </p>
                </Box>
            })}
        </section>
        <section style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '15px' }}>
            <SunGlassSection>
                <Sunrise />
                <span style={{ marginTop: '2px'}}>{getSunTime(data!.sunrise)}</span>
            </SunGlassSection>
            <SunGlassSection>
                <Sunset />
                <span style={{ marginTop: '2px'}}>{getSunTime(data!.sunset)}</span>
            </SunGlassSection>
        </section>
        <section style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '80%', marginTop: '15px' }}>
            <Tile 
                icon="wind" 
                title="Wind" 
                info={`${Math.round(today!.wind.speed)} km/h`} 
                description={`${getWindDirection(Math.round(today!.wind.deg))}, gusts ${today!.wind.gust.toFixed(1)} km/h`} 
            />
            <Tile 
                icon="feels" 
                title="Feels Like"
                info={<Degree temp={Math.round(today!.main.feels_like)} />}
                description={`Feels ${Math.round(today!.main.feels_like) < Math.round(today!.main.temp) ? 'colder' : 'warmer' }`} 
            />
            <Tile
                icon="humidity"
                title="Humidity"
                info={`${today!.main.humidity}%`}
                description={`${getHumidityValue(today!.main.humidity)}`}
            />
            <Tile
                icon="pop"
                title="Precipitation"
                info={`${Math.round(today!.pop * 1000)}%`}
                description={`${getPop(today!.pop)}, clouds at ${today!.clouds.all}%`}
            />
            <Tile
                icon="pressure"
                title="Pressure"
                info={`${today!.main.pressure} hPa`}
                description={`${Math.round(today!.main.pressure) < 1013 ? 'Lower' : 'Higher'} than standard`}
            />
            <Tile
                icon="visibility"
                title="Visibility"
                info={`${(today!.visibility / 1000).toFixed()} km`}
                description={`${getVisibilityValue(today!.visibility)}`}
            />
        </section>
    </Box>
  )
}

export default ForeCast