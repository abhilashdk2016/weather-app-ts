import { Box, Button, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material";
import { Search } from '@mui/icons-material';
import { optionType } from "../types";
  
  const GlassSection = styled(Box)({
    background: `rgba( 255, 255, 255, 0.2 )`,
    boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )`,
    backdropFilter: `blur( 3.5px )`,
    borderRadius: '10px',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: "500px",
    maxHeight: "500px",
    width: "100%",
    color: "gray"
  })
  
  const StyledText = styled('input')({
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    border: '1px solid white',
    background: 'white',
    height: '28px',
    outline: 'none',
    color: 'black'
  });
  
  const StyledButton = styled(Button)({
    borderRadius: 0,
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    border: '2px solid white',
    color: 'white',
    cursor: 'pointer',
    height: '32px !important',
    textTransform: 'none',
    outline: 'none'
  })

  type Props = {
    loc: string
    options: []
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
  }
  
const SearchComponent = ({
    loc,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit
}: Props) => {
  return <GlassSection>
  <h1>Weather Forecast</h1>
  <p>Enter below a place you want to know the weather of</p>
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: "flex" }}>
      <StyledText value={loc} onChange={onInputChange}/>
      <StyledButton onClick={onSubmit}><Search /></StyledButton>
    </Box>
    {
      options.length > 0 && <Box sx={{ width: '70%', maxWidth: 360, bgcolor: 'background.paper', marginTop: '5px', borderRadius: '5px' }}>
        <List>
        {
          options.map((option: optionType, index: number) => {
            return <ListItem sx={{ padding: '0px !important' }} key={index}>
            <ListItemButton onClick={() => onOptionSelect(option)}>
              <ListItemText>{option.name}, {option.country}</ListItemText>
            </ListItemButton>
          </ListItem>
          })
        }
        </List>
      </Box>
    }
  </Box>
</GlassSection>
}

export default SearchComponent