import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from './RepoItem';


const Timeline = () => {

  const [ repos, setRepos] = useState([]);
  const gitHubUserName = "sjngplus";
  
  useEffect(() => {
    const url = `https://api.github.com/users/${gitHubUserName}/repos`;
    console.log("##Fetching data from API##");
    axios.get(url)
    .then(res => setRepos(res.data))
    .catch(err => console.log(err));
  }, [gitHubUserName])

  const parsedReposList = repos.map(repo => {
    const parsedName = repo.full_name.replace(`${gitHubUserName}/`, "");

    return <RepoItem 
      key={repo.id}
      repoName={parsedName}
      time={repo.created_at}
    />
  })


  return (
    <div>
      {parsedReposList}
    </div>
  )
}

export default Timeline;