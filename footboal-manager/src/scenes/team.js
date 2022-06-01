import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { TeamData } from '../data/TeamData';
import { PlayerData } from '../data/PlayerData';
import { SystemPlayer } from '../data/SystemPlayer';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";



function Team() {

          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [sidebar, setSidebar] = useState(true);
          const [system, setSystem] = useState();
          const child = { width: `21em`, height: `100%` };
          const itemRows = [];
          for(let i of SystemPlayer){
          const grid = [
          <div className="fields">
          {i.visible && (
          <div className="circleField"><h5>{i.number}</h5></div>)}
          </div>
          ];
           itemRows.push(grid);

          }


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

                        <HorizontalScroll>

                                  {PlayerData.filter(t => t.idTeam==team)
                                   .map(item =>


                                   <div key={item.id} className="CardPlayer" style={child}>
                                   <img className="ImgCardPlayer" src={item.image}/>
                                   <div style={{float: 'left'}}>
                                    <h3 >{item.name}
                                    <h4 className="circle"><h5>{item.number}</h5></h4>
                                    <h4>{item.position}</h4>
                                    </h3>


                                    </div>
                                    </div>

                                 )}
                                 </HorizontalScroll>

                        </div>

                        <div className="Field">
                        {itemRows}
                        </div>

                        <div className="RightBoxTeam">
                        <div >
                                <label style={{color: '#fff'}} >Set System</label>
                                <br/>
                                    <select style={{width: '50%'}}  onChange={(e) => setSystem(e.target.value)}>
                                      <option value={1}>4-4-2</option>
                                      <option value={2}>3-4-3</option>
                                      <option value={3}>5-3-1</option>
                                      <option>4</option>
                                    </select>

                            </div>
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
//            )}

// <HorizontalScroll style={{marginRight: '5%'}}>
// </HorizontalScroll>