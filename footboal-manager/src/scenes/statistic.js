import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import  StatisticChartData  from '../data/StatisticChartData';

function Statistic() {
          const [sidebar, setSidebar] = useState(true);
          const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));
          const [flag, setFlag] = useState(false);


          const [teamOneData, setTeamOneData] = useState(matchData
                    .filter(a => a.idTeam==JSON.parse(localStorage.getItem('user')).team
                    && a.round==(JSON.parse(localStorage.getItem('round'))-1))
                    .map(item => item));

          const [statisticData, setStatisticData] = useState({
          labels: ['Score','Shot at goal','Accurate shots', 'Fouls', 'Free kick','Yellow Cards','Corners','Changes'],
          datasets: [
          {
          label: '',
          data: [0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
          ],
          backgroundColor: ["rgba(75,192,192,1)","rgba(32,43,165,16)","#bf1b2e","rgba(75,123,165,1)","#50AF95","#80530a","#ffc107","#d530c"],
          borderColor: "black",
          borderWidth: 2,
          hoverOffset: 10
          },
          ],});

           useEffect(() => {
           if(JSON.parse(localStorage.getItem('round'))!=1){
           setFlag(true);
           }

           }, []);
           useEffect(() => {
           if(flag){
           setStatisticData({
           labels: ['Score','Shot at goal','Accurate shots', 'Fouls', 'Free kick','Yellow Cards','Corners','Changes'],
           datasets: [
           {
           label: '',
           data: [teamOneData[0].score,
           teamOneData[0].shotAtGoal,teamOneData[0].accurateShots,teamOneData[0].fouls,
           teamOneData[0].freeKicks,teamOneData[0].yellowCards,teamOneData[0].corners,teamOneData[0].changes
           ],
           backgroundColor: ["rgba(75,192,192,1)","rgba(32,43,165,16)","#bf1b2e","rgba(75,123,165,1)","#50AF95","#80530a","#ffc107","#d530c"],
           borderColor: "black",
           borderWidth: 2,
           hoverOffset: 10
           },
           ],});
           }

           }, [flag]);



  return (
     <>
              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                       <ul className='nav-menu-items' >
                       <br/>
                         {SidebarData.map((item, index) => {
                           return (
                             <li key={index} className={item.cName}>
                               <Link to={item.path}>
                                 {item.icon}
                                 <span>{item.title}</span>
                               </Link>
                             </li>
                           );
                         })}
                       </ul>
                     </nav>
                   </IconContext.Provider>
                    <div className="MainBox" >

                    <div className="LeftBoxMain" style={{width: '170vh'}}>
                    <h2 id="white">Your Last Match Statistic</h2>
                    {flag && (
                    <div style={{marginTop: '10vh',margin: '2%', width: '45%', height: '45%'}}>
                     <StatisticChartData chartData={statisticData} />
                     </div>
                    )}

                    </div>


                     </div>

       </>
  );
}

export default Statistic;