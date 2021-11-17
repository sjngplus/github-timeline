import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import './Header.scss';

const Header = (props) => {  

  return (
    <div className="header-body">
      <Paper
        component="form"
        sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', boxShadow: "none"}}
      >     
        <InputBase
          sx={{ ml: 1, flex: 1 }}          
          placeholder="Enter Github username"
          value={props.searchValue}
          onChange={e => props.setSearchValue(e.target.value)}
        />
        <IconButton onClick={props.handleClick} sx={{ p: '10px' }} >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Header
