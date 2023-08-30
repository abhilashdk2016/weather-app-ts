import { Box, styled } from "@mui/material";
import Wind from "../icons/Wind";
import Feels from "../icons/Feels";
import Humidity from "../icons/Humidity";
import Visibility from "../icons/Visibility";
import Pressure from "../icons/Pressure";
import Pop from "../icons/Pop";


type Props = {
    icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop';
    title?: string;
    info?: string | JSX.Element;
    description?: string;
}

const icons = {
    wind: Wind,
    feels: Feels,
    humidity: Humidity,
    visibility: Visibility,
    pressure: Pressure,
    pop: Pop
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const GlassSection = styled(Box)({
    background: `rgba( 255, 255, 255, 0.2 )`,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '40%',
    color: "black",
    padding: '15px',
    marginBottom: '15px',
    height: '130px'
  });
  const Icon = icons[icon];
  return (
    <GlassSection>
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold'}}>
          <Icon /> <h4 style={{ margin: '1px'}}>{title}</h4>
        </Box>
        <h3 style={{ margin: 0}}>{info}</h3>
        <p style={{ margin: 0}}>{description}</p>
    </GlassSection>
  )
}

export default Tile