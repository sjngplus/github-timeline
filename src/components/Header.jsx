import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { FaSort } from 'react-icons/fa';
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
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault() 
              props.handleClick()
            };
          }}
        />
        <IconButton onClick={props.handleClick} sx={{ p: '10px' }} >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <FaSort />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Header
