import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import  PlayerChartData  from '../data/PlayerChartData';
import {useNavigate} from "react-router";
import { useToasts } from "react-toast-notifications";

function Transfer() {
          let navigate = useNavigate();
          const child = { width: `22em`, height: `100%` };
          const [sidebar, setSidebar] = useState(true);
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')));
          const [buy, setBuy] = useState(true);
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerProperties, setPlayerProperties] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [playerId, setPlayerId] = useState();
          const [amount, setAmount] = useState(0);
          const [cost, setCost] = useState(0);
          const { addToast } = useToasts();


          const [playerPropertiesData, setPlayerPropertiesData] =  useState({
                    labels: ['pace','passing','shotting', 'dribbling', 'defending','physical'],
                    datasets: [
                    {
                     label: player.filter(t => t.id===playerId && t.idTeam==0).map((data) => data.name),
                     data: [playerProperties.filter(t => t.id===playerId).map((data) => data.pac),
                     playerProperties.filter(t => t.id===playerId).map((data) => data.pas),
                    playerProperties.filter(t => t.id===playerId).map((data) => data.sho),
                    playerProperties.filter(t => t.id===playerId).map((data) => data.dri),
                    playerProperties.filter(t => t.id===playerId).map((data) => data.def),
                    playerProperties.filter(t => t.id===playerId).map((data) => data.psy)
                     ],
                     backgroundColor: ["rgba(75,192,192,1)","rgba(32,43,165,16)","#bf1b2e","rgba(75,123,165,1)","#50AF95","#80530a"],
                     borderColor: "black",
                     borderWidth: 2,
                     },
                     ],});

                    useEffect(() => {
                    setPlayerPropertiesData({
                    labels: ['pace','passing','shotting', 'dribbling', 'defending','physical'],
                    datasets: [
                    {
                      label: player.filter(t => t.id===playerId && t.idTeam==0).map((data) => data.name),
                      data: [playerProperties.filter(t => t.id===playerId).map((data) => data.pac),
                      playerProperties.filter(t => t.id===playerId).map((data) => data.pas),
                      playerProperties.filter(t => t.id===playerId).map((data) => data.sho),
                      playerProperties.filter(t => t.id===playerId).map((data) => data.dri),
                      playerProperties.filter(t => t.id===playerId).map((data) => data.def),
                      playerProperties.filter(t => t.id===playerId).map((data) => data.psy)
                    ],
                      backgroundColor: ["rgba(75,192,192,1)","rgba(32,43,165,16)","#bf1b2e","rgba(75,123,165,1)","#50AF95","#80530a"],
                      borderColor: "black",
                      borderWidth: 2,
                      },
                    ],});
                    setCost(player.filter(t => t.id==playerId && t.idTeam==0)
                     .map(item => item.cost));

                     }, [playerId]);

        const buyPlayer = (id) =>{
        addToast("You bought the player for " + player.filter(a => a.id==id).map(item => item.cost) + " Euro", {
                  appearance: "success",
                  autoDismiss: true
                });
        player.filter(a => a.id==id).map(item => item.idTeam=team);
        teamData.filter(a => a.id==team).map(item => item.budget = (item.budget - cost) )
        teamData.filter(a => a.id==team).map(item => item.numberOfPlayer = (item.numberOfPlayer + 1) )
        localStorage.setItem("teamData", JSON.stringify(teamData));
        localStorage.setItem("playerData", JSON.stringify(player));
        navigate('/transfer');

        }

        const sellPlayer = (id) =>{

                player.filter(a => a.id==id).map(item => item.idTeam=0);
                player.filter(a => a.id==id).map(item => item.cost=amount);
                addToast("You sold the player for " + player.filter(a => a.id==id).map(item => item.cost) + " Euro", {
                                          appearance: "success",
                                          autoDismiss: true
                                        });
               // teamData.filter(a => a.id==team).map(item => item.budget = (item.budget + amount) )
               teamData.filter(a => a.id==team).map(item => item.numberOfPlayer = (item.numberOfPlayer - 1) )
                localStorage.setItem("teamData", JSON.stringify(teamData));
                localStorage.setItem("playerData", JSON.stringify(player));
                navigate('/transfer');

                }





  return (
     <>
              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                       <ul className='nav-menu-items'>
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
                    <nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd', height: '10%'}}>
                      <form className="form-inline" style={{marginLeft: '5%'}}>
                        <button className="btn btn-outline-success btn-lg" type="button" onClick={() => setBuy(true)}>Buy Players</button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-outline-success btn-lg" type="button" onClick={() => setBuy(false)}>Sell Players</button>
                      </form>
                    </nav>


                    {buy && (

                    <div className="PlayerBox" >
                     <HorizontalScroll>
                     {player.filter(t => t.idTeam==0)
                      .map(item =>
                      <div key={item.id} className="CardPlayerTr" style={child} onClick={() => setPlayerId(item.id)}>
                      <img className="ImgCardPlayer" src={item.image} alt="player"/>
                     <div style={{float: 'left',margin:'0 auto'}}>
                     <h3 id="white">{item.name}</h3>
                     <h3 id="white">{item.position}</h3>
                      </div>
                       </div>
                       )}
                     </HorizontalScroll>


                     <div className="PlayerInfoTr">
                     <div style={{float:'left', width: '100%', height: '80%'}}>
                      {player.filter(t => t.id==playerId && t.idTeam==0)
                       .map(item =>
                       <div>
                        <img className="ImgCardPlayer" src={item.image} alt="player" style={{float:'left', margin: '5%', border: 'solid'}}/>
                        <div key={item.id} style={{float:'left',  margin: '5%'}}>
                        <h3 style={{color: '#fff' }}>Name: {item.name}</h3>
                        <h3 style={{color: '#fff' }}>Position: {item.position}</h3>
                        <h3 style={{color: '#fff' }}>Cost: {item.cost} Euro</h3>
                        <h3 style={{color: '#fff' }}>Payment: {item.payment} Euro</h3>
                        <h3 style={{color: '#fff' }}>Number: {item.number} </h3>
                        <h3 style={{color: '#fff' }}>Age: {item.age} </h3>
                        <br/>
                        <button className="btn btn-primary btn-lg" type="button" onClick={() => buyPlayer(item.id)}>Buy Player</button>
                        </div>

                         </div>
                         )}
                     </div>

                     </div>
                    <div className="PlayerInfoTrPro">
                     <div style={{marginTop: '10vh',margin: '2%', width: '95%', height: '55%', background: '#fff'}}>
                      <PlayerChartData chartData={playerPropertiesData} />
                      </div>
                    </div>


                    </div>
                    )}
                    {!buy && (

                    <div className="PlayerBox" >
                    <HorizontalScroll>
                     {player.filter(t => t.idTeam==team)
                     .map(item =>
                     <div key={item.id} className="CardPlayerTr" style={child} onClick={() => setPlayerId(item.id)}>
                     <img className="ImgCardPlayer" src={item.image} alt="player"/>
                     <div style={{float: 'left',margin:'0 auto'}}>
                     <h3 id="white">{item.name}</h3>
                     <h3 id="white">{item.position}</h3>
                     </div>
                     </div>
                     )}
                     </HorizontalScroll>


                    <div className="PlayerInfoSl">
                    <div style={{float:'left', width: '100%', height: '80%'}}>
                    {player.filter(t => t.id==playerId)
                    .map(item =>
                    <div>
                    <img className="ImgCardPlayer" src={item.image} alt="player" style={{float:'left', margin: '5%', border: 'solid'}}/>
                    <div key={item.id} style={{float:'left',  margin: '5%'}}>
                    <h3 style={{color: '#fff' }}>Name: {item.name}</h3>
                    <h3 style={{color: '#fff' }}>Position: {item.position}</h3>
                    <h3 style={{color: '#fff' }}>Cost: {item.cost} Euro</h3>
                     <h3 style={{color: '#fff' }}>Payment: {item.payment} Euro For Game</h3>
                     <h3 style={{color: '#fff' }}>Number: {item.number} </h3>
                     <h3 style={{color: '#fff' }}>Age: {item.age} </h3>
                     <br/>
                     <input className="form-control form-control-lg" type="number" placeholder="set amount"  aria-label=".form-control-lg example" onChange={(e) => setAmount(e.target.value)}/>
                    <br/>
                    <button className="btn btn-primary btn-lg" type="button" onClick={() => sellPlayer(item.id)}>Sell Player</button>
                    </div>
                     </div>
                      )}
                                         </div>

                    </div>

                    </div>
                    )}

                    </div>


       </>
  );
}

export default Transfer;

