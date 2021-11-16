import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
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

  // const parsedReposList = repos.map(repo => {
  //   const parsedName = repo.full_name.replace(`${gitHubUserName}/`, "");
  //   return <RepoItem 
  //     key={repo.id}
  //     repoName={parsedName}
  //     time={repo.created_at}
  //   />
  // })
  const parsedReposList = repos.map(repo => {
    const parsedRepoName = repo.full_name.replace(`${gitHubUserName}/`, "");
    return  (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        
      >
        <h3 className="vertical-timeline-element-title">Creative Director</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project Management, Team Leading
        </p>
      </VerticalTimelineElement>
    )
  })


  return (
    <VerticalTimeline> 
      {parsedReposList}
    </VerticalTimeline> 
  )
}

export default Timeline;