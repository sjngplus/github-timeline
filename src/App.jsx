import { useState } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

function App() {  

  const [ searchValue, setSearchValue ] = useState("");
  const [ githubName, setGithubName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const searchBtnClick = () => {
    if (searchValue) {
      setIsLoading(true);
      setGithubName(searchValue);
    }
  };


  return (
    <div className="App">
      <Header 
        handleClick={searchBtnClick}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {githubName ? <Timeline githubName={githubName} setLoading={setIsLoading} /> : <Alert severity="info" style={{margin: '20px'}}>Enter a Github username and click search.</Alert> }
      {isLoading && <LinearProgress style={{margin: '10px 1px'}}/>}
    </div>
  );
}

export default App;
