import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Statistic() {
          const [sidebar, setSidebar] = useState(true);
          const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));
          const [flag, setFlag] = useState(false);

          const [teamOneData, setTeamOneData] = useState(matchData
                    .filter(a => a.idTeam==JSON.parse(localStorage.getItem('user')).team
                    && a.round==(JSON.parse(localStorage.getItem('round'))-1))
                    .map(item => item));
           useEffect(() => { if(JSON.parse(localStorage.getItem('round'))!=1){
           setFlag(true);
           }

           }, []);


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
                    <h2 id="white">Goal: {teamOneData[0].score}
                    <h2>Shot at Goal: {teamOneData[0].shotAtGoal}</h2>
                    <h2>Fouls: {teamOneData[0].fouls}</h2>
                    <h2>Free Kick: {teamOneData[0].freeKicks}</h2>
                    <h2>Yellow Cards: {teamOneData[0].yellowCards}</h2>
                    <h2>Corners: {teamOneData[0].corners}</h2>
                     <h2>Changes: {teamOneData[0].changes}</h2>
                    </h2>
                    )}

                    </div>


                     </div>

       </>
  );
}

export default Statistic;