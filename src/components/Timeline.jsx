import { useEffect, useState } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./Timeline.scss"
import { BsGithub } from 'react-icons/bs';
import { DiRuby } from 'react-icons/di';
import { ImEmbed2 } from 'react-icons/im';
import { IoLogoJavascript, IoLogoHtml5, IoLogoPython } from 'react-icons/io';

const Timeline = () => {

  const [ repos, setRepos] = useState([]);
  const gitHubUserName = "sjngplus";
  
  useEffect(() => {
    const url = `https://api.github.com/users/${gitHubUserName}/repos?per_page=100`;
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
  
  const iconLogo = (language) => {
    const icons = {
      "JavaScript": <IoLogoJavascript />,
      "HTML": <IoLogoHtml5 />,
      "EJS": <ImEmbed2 />,
      "Ruby": <DiRuby />,
      "Python": <IoLogoPython />,
      "default": <BsGithub />
    }
    return icons[language] || icons.default;
  };

  const colorPicker = (language) => {
    const color = {
      "JavaScript": "gold",
      "HTML": "orange",
      "EJS": "pink",
      "Ruby": "red",
      "Python": "royalblue",
      "default": "slateGray"
    }
    return color[language] || color.default;
  };
  
  const parsedReposList = repos.map(repo => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const parsedRepoDate = new Date(repo.created_at).toLocaleDateString("en-US", dateOptions);
    const repoColor = colorPicker(repo.language);
    
    return  (
      <VerticalTimelineElement
        key={repo.id}
        className="vertical-timeline-element"
        contentStyle={{ background: 'white', color: 'black', borderTop: `solid ${repoColor} 6px` }}
        contentArrowStyle={{ borderRight: `7px solid  ${repoColor}` }}
        date={parsedRepoDate}
        iconStyle={{ background: `${repoColor}`, color: '#fff', }}
        icon={iconLogo(repo.language)}       
      >
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "inherit"}}>
        <h3 className="vertical-timeline-element-title">{repo.name}</h3>
        <h5 className="vertical-timeline-element-subtitle">{repo.language ? repo.language : "n/a"}</h5>        
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