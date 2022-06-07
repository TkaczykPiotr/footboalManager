import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';

import ModalExit from '../modal/modalExit';
import '../css/Navbar.css';
import BackdropFilter from "react-backdrop-filter";
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Main() {
          const [sidebar, setSidebar] = useState(true);
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')));
          const [teamOneData, setTeamOneData] = useState(teamData.filter(a => a.id==team).map(item => item));
          const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));
          const [matchId, setMatchId] = useState(matchData
                    .filter(a=> a.round == JSON.parse(localStorage.getItem('round'))
                    && a.idTeam==JSON.parse(localStorage.getItem('user')).team)
                    .map(item=> item.id));

          const [teamEnemy, setTeamEnemy] = useState(matchData
                                                               .filter(a => a.idTeam == matchData
                                                               .filter(s => s.idTeam != team && s.id==matchId)
                                                               .map(item => item.idTeam) && a.round==JSON.parse(localStorage.getItem('round')))
                                                               .map(item => item));
            const [teamEnemyData, setTeamEnemyData] = useState(teamData.filter(a => a.id==teamEnemy[0].idTeam).map(item => item));




  return (
     <>

              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                       <ul className='nav-menu-items' >
                       <br/>
                         {SidebarData.map((item, index) => {
                           return (
                             <li key={index} className={item.cName} >
                               <Link to={item.path}  >
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


                        <div className="LeftBoxMain">
                            <img className="ImgCardPlayer" src={teamOneData[0].imageHerb} alt="herb"/>
                          <h2 id="white">Manager: {JSON.parse(localStorage.getItem('user')).name}</h2>

                          <h3 id="white">Club name: {teamOneData[0].name}
                         <h3 >City: {teamOneData[0].city} </h3>
                        <h3 >Budged: {teamOneData[0].budget} Euro</h3>
                       <h3 >Number of Player: {teamOneData[0].numberOfPlayer}</h3>

                    </h3>


                        </div>

                        <div className="RightBoxMain">
                        <h3  id="white">Next Match: {teamEnemyData[0].name}  </h3>



                        </div>






                </div>

       </>
  );
}

export default Main;