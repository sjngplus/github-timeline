import { useState } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

function App() {  

  const [ searchValue, setSearchValue ] = useState("");
  const [ githubName, setGithubName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ noData, setNoData ] = useState(false);

  const searchBtnClick = () => {    
    if (searchValue) {
      setNoData(false);
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
      {!searchValue && <Alert severity="info" style={{margin: '20px'}}>Enter a Github username and click search.</Alert>}
      {githubName && !noData && <Timeline githubName={githubName} setLoading={setIsLoading} setNoData={setNoData}/>}
      {isLoading && <LinearProgress style={{margin: '10px 1px'}}/>}
      {noData && searchValue && <Alert severity="info" style={{margin: '20px'}}>No repo data received. Try a different Github username.</Alert>}
    </div>
  );
}

export default App;
