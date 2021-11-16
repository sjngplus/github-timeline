import { useEffect, useState } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./VerticalTimeline.css"
import { BsGithub } from 'react-icons/bs';

const Timeline = () => {

  const [ repos, setRepos] = useState([]);
  const gitHubUserName = "sjngplus";
  
  useEffect(() => {
    const url = `https://api.github.com/users/${gitHubUserName}/repos`;
    console.log("##Fetching data from API##");
    axios.get(url)
    .then(res => {
      const responseDataArray = res.data;
      responseDataArray.sort((a, b) => {
        if (a.created_at < b.created_at) return -1;
        if (a.created_at > b.created_at) return 1;
        return 0;      
      });
      setRepos(responseDataArray);
    })
    .catch(err => console.log(err));
  }, [gitHubUserName]) 
  
  
  const parsedReposList = repos.map(repo => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const parsedRepoDate = new Date(repo.created_at).toLocaleDateString("en-US", dateOptions);
    return  (
      <VerticalTimelineElement
        key={repo.id}
        className="vertical-timeline-element"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2011 - present"
        iconStyle={{ background: 'grey', color: '#fff', }}
        icon={<BsGithub />}       
      >
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "inherit"}}>
        <h3 className="vertical-timeline-element-title">{repo.name}</h3>
        <h5 className="vertical-timeline-element-subtitle">{parsedRepoDate}</h5>
        <p>{repo.language ? repo.language : "n/a"}</p>
      </a>
      </VerticalTimelineElement>
    )
  })


  return (
    <VerticalTimeline className="vertical-timeline vertical-timeline--animate vertical-timeline--two-columns">
      {parsedReposList}
    </VerticalTimeline>
  )
}

export default Timeline;