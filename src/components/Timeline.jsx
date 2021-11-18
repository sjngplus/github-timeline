import { useEffect, useState } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "./Timeline.scss"
import { BsGithub } from 'react-icons/bs';
import { DiRuby } from 'react-icons/di';
import { ImEmbed2 } from 'react-icons/im';
import { IoLogoJavascript, IoLogoHtml5, IoLogoPython } from 'react-icons/io';
import Alert from '@mui/material/Alert';

const Timeline = (props) => {
  
  const [ parsedPageDisplay, setParsedPageDisplay] = useState("");

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
 
  const parsingReceivedRepoData = (inputArray) => {

    const outputArray = inputArray.map(repo => {
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
    });
    return outputArray;

  };

  const userNameToFetch = props.githubName;
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();    
    if (userNameToFetch) {

      const url = `https://api.github.com/users/${userNameToFetch}/repos?per_page=100`;
      console.log("##Fetching data from API##");
      axios.get(url, {cancelToken: cancelTokenSource.token})      
      .then(res => {
        if (!res.data.length) props.setNoData(true);
        const responseDataArray = res.data;
        responseDataArray.sort((a, b) => {
          if (a.created_at < b.created_at) return -1;
          if (a.created_at > b.created_at) return 1;
          return 0;      
        });
        setParsedPageDisplay(parsingReceivedRepoData(responseDataArray));
        props.setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setParsedPageDisplay(<Alert severity="warning" >Could not fetch data. Please try another username.</Alert>);
        props.setLoading(false);
      });

    }
    return () => {cancelTokenSource.cancel()};
  }, [userNameToFetch])


  return (
    <VerticalTimeline className="vertical-timeline">
      {parsedPageDisplay}
    </VerticalTimeline>
  )
}

export default Timeline;