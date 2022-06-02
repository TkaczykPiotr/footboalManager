import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import Engine from './engine';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';


function GamePlay() {
          const [sidebar, setSidebar] = useState(true);
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerPro, setPlayerPro] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);

          const [playerPlay, setPlayerPlay] = useState(
          player.filter(t => t.play===true && t.idTeam==JSON.parse(localStorage.getItem('user')).team).map((data) => data)
          );

          const [playerAwayPlay, setPlayerAwayPlay] = useState(
          player.filter(t => t.play===true && t.idTeam==JSON.parse(localStorage.getItem('matchesData')).filter(s =>
          s.idHomeTeam==team && s.round==JSON.parse(localStorage.getItem('round'))).map(tata => tata.idAwayTeam)).map((data) => data)
          );

          const [playerProPlay, setPlayerProPlay] = useState(
          playerPro.filter(t => t.id === playerPlay.map(s => s)).map((data)=> data)
          );


          const [playerProAwayPlay, setPlayerProAwayPlay] = useState();






          const child = { width: `21em`, height: `100%` };
          const [time, setTime] = useState(0);

                useEffect(() => {
                  if(time<90){
                      const interval = setInterval(() => {
                                  setTime(time => time+1);
                                    engine();
                                  }, 1000);
                           return () => clearInterval(interval);
                    } }, [time]);

            function engine() {

            console.log(time);

            }











  return (
     <>
     {console.log(playerProPlay)}



     <div>
              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{width: '20%'}}>
                       <ul className='nav-menu-items' >
                       <br/>
                             <li  className="nav-text">
                               <Link to='/main'>
                                    <ImIcons.ImExit />
                                 <span>Leave</span>
                               </Link>
                             </li>
                             <li  className="nav-text">
                               <Link to='/main'>
                               <ImIcons.ImExit />
                                <span>Start</span>
                                </Link>
                             </li>
                              <li  className="nav-text">
                               <a style={{color: '#f5f5f5'}}>
                              <ImIcons.ImExit />
                              <span>System </span>
                                   <select  style={{width: '50%', marginLeft: '10%'}} >
                                   <option value={1}>4-4-2</option>
                                   <option value={2}>3-4-3</option>
                                   <option value={3}>5-3-1</option>
                                   </select>
                              </a>

                              </li>
                       </ul>
                     </nav>
                   </IconContext.Provider>
                    <div className="MainBox" style={{marginLeft: '384px'}}>
                    <div className="InfoTopBox">
                        <h2 style={{color: '#fff'}}>{time}:00</h2>
                         <h2 style={{color: '#fff'}}>0:0</h2>
                    </div>

                    <div className="Field">

                     </div>

                     <div className="RightBoxTeam">
                     <Engine />


                     </div>



                     <div className="PlayerBox" style={{background: '#6c757d'}} >
                      <HorizontalScroll>
                                                       {player.filter(t => t.idTeam==team)
                                                        .map(item =>
                                                        <div key={item.id} className="CardPlayer" style={child} >
                                                        <img className="ImgCardPlayer" src={item.image} alt="player"/>
                                                        <div style={{float: 'left',margin:'0 auto'}}>
                                                         <h3 style={{color: '#fff' }}>{item.name}
                                                         <button className="circle" style={{margin:'0 auto'}} >{item.number}</button>

                                                         </h3>
                                                         </div>
                                                         </div>
                                                      )}
                      </HorizontalScroll>
                     </div>





                    </div>


        </div>
       </>
  );
}

export default GamePlay;