import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { TeamData } from '../data/TeamData';
import { PlayerData } from '../data/PlayerData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";



function Team() {
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [sidebar, setSidebar] = useState(true);
          const child = { width: `20em`, height: `100%` };


          //setTeam(JSON.parse(localStorage.getItem('user')).team);


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
                        <div className="PlayerBox">
                        <HorizontalScroll style={{marginRight: '5%'}}>

                                  {PlayerData.filter(t => t.idTeam==team)
                                   .map(item =>

                                  <div className="position-static"  key={item.id} style={child} >
                                   <div className="CardPlayer">
                                   <img className="ImgCardPlayer" src={item.image}/>
                                   <div style={{float: 'left'}}>
                                    <h3 >{item.name}
                                    <h4>{item.cost} euro</h4>
                                    <h4>{item.number}</h4>
                                    <h4>{item.position}</h4>
                                    </h3>

                                    </div>
                                    </div>
                                    </div>

                                 )}

                              </HorizontalScroll>
                        </div>

                        <div className="Field">
                        <div className="circle"></div>
                        </div>

                        <div className="RightBoxTeam">
                        </div>

                        <div className="BotBoxTeam">
                         </div>


                    </div>

       </>
  );
}

export default Team;

//<h2>Hello {JSON.parse(localStorage.getItem('user')).name}</h2>
//                    <h2>{JSON.parse(localStorage.getItem('user')).team}</h2>
//                    <h2>{team}</h2>
//                    {TeamData.filter(t => t.id==team)
//                    .map(item =>
//                            <ul key={item.id}>{item.name}
//                            <h3>{item.city}</h3>
//                            <h3>{item.budget}</h3>
//                            <h3>{item.numberOfPlayer}</h3>
//                            </ul>
//                        )}