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
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [playerProperties, setPlayerProperties] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [playerId, setPlayerId] = useState(playerProperties
          .sort((a,b) =>  a.sho < b.sho ? 1:-1)
          .filter(a => a.idTeam==team)
          .map(item=> item.id));

//           for(var i; i<21; i++){
//                               var max = 0;
//                               var sum =0;
//                               sum = playerProperties[i].pac +  playerProperties[i].pas +  playerProperties[i].sho +  playerProperties[i].dri + playerProperties[i].def;
//                               console.log(sum);
//                               if(max < sum){
//                               max = sum;
//                               playerId = playerProperties[i].id;
//                               }
//                               }





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
            console.log(playerId);
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
                    <div style={{float: 'left', marginLeft: '2%', width: '50%', height: '50%'}}>

                    {flag && (
                    <div style={{marginTop: '10vh',margin: '2%'}}>
                    <h2 id="white">Your Last Match Statistic</h2>
                     <StatisticChartData chartData={statisticData} />
                     </div>
                    )}
                    </div>

                    <div style={{float: 'left', marginLeft: '20%'}}>
                    <h2 id="white">Best Player</h2>
                    <div style={{float:'left', width: '100%', height: '80%'}}>
                      {player.filter(t => t.id==playerId[0])
                      .map(item =>
                       <div>
                       <img className="ImgCardPlayer" src={item.image} alt="player" style={{float:'left', margin: '5%', border: 'solid'}}/>
                       <div key={item.id} style={{float:'left',  margin: '5%'}}>
                       <h3 style={{color: '#fff' }}>Name: {item.name}</h3>
                        {playerProperties.filter(t => t.id==playerId[0] )
                        .map(itemPro =>
                        <div>
                        <h3 id="white">Pace: {itemPro.pac} </h3>
                        <h3 id="white">Passing: {itemPro.pas} </h3>
                        <h3 id="white">Shotting: {itemPro.sho} </h3>
                        <h3 id="white">Dribbling: {itemPro.dri} </h3>
                        <h3 id="white">Defending: {itemPro.def} </h3>
                        <h3 id="white">Physical: {itemPro.psy} </h3>
                         </div>
                        )}

                        </div>
                        </div>
                        )}

                     </div>
                    </div>



                    </div>


                     </div>

       </>
  );
}

export default Statistic;