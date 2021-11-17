import { useState } from 'react';
import Timeline from './components/Timeline';
import Header from './components/Header';

function App() {  

  const [ searchValue, setSearchValue ] = useState("");
  const [ githubName, setGithubName ] = useState("");

  const searchBtnClick = () => {
    setGithubName(searchValue);
  };


  return (
    <div className="App">
      <Header 
        handleClick={searchBtnClick}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Timeline githubName={githubName}/>
    </div>
  );
}

export default App;
