import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { TeamData } from '../data/TeamData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Team() {
          const [sidebar, setSidebar] = useState(true);
          const showSidebar = () => setSidebar(!sidebar);




  return (
     <>
              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                       <ul className='nav-menu-items' onClick={showSidebar}>
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
                    <h2>Hello {JSON.parse(localStorage.getItem('user')).name}</h2>
                    <h2>{JSON.parse(localStorage.getItem('user')).team}</h2>
                    {TeamData.map((item, index) => {
                            return (
                            <h3 key={index} className={item.name}>
                            <h3>{item.city}</h3>
                            <h3>{item.budget}</h3>
                            <h3>{item.numberOfPlayer}</h3>
                            </h3>
                            );
                        })}
                    </div>

       </>
  );
}

export default Team;