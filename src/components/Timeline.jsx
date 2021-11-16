import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsGithub } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    const parsedRepoName = repo.full_name.replace(`${gitHubUserName}/`, "");
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const parsedRepoDate = new Date(repo.created_at).toLocaleDateString("en-US", dateOptions);
    return  (
      <VerticalTimelineElement
      className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<BsGithub />}
      >
        <h3 className="vertical-timeline-element-title">{parsedRepoName}</h3>
        <h5 className="vertical-timeline-element-subtitle">{parsedRepoDate}</h5>
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