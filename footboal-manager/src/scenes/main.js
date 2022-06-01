import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { TeamData } from '../data/TeamData';
import '../css/Navbar.css';
import BackdropFilter from "react-backdrop-filter";
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Main() {
          const [sidebar, setSidebar] = useState(true);

          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);



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

                        <div className="LeftBoxMain">

                          <h2 style={{color: '#fff'}}>Manager: {JSON.parse(localStorage.getItem('user')).name}</h2>
                          {TeamData.filter(t => t.id==team)
                         .map(item =>
                          <h3 key={item.id} style={{color: '#fff'}}>Club name: {item.name}
                         <h3 style={{color: '#fff'}}>City: {item.city} </h3>
                        <h3 style={{color: '#fff'}}>Budged: {item.budget} Euro</h3>
                       <h3 style={{color: '#fff'}}>Number of Player: {item.numberOfPlayer}</h3>
                    </h3>
                   )}

                        </div>

                        <div className="RightBoxMain">

                        </div>






                </div>

       </>
  );
}

export default Main;