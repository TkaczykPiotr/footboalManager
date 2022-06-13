import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { SupportData } from '../data/SupportData';
import ModalExit from '../modal/modalExit';
import '../css/Navbar.css';
import BackdropFilter from "react-backdrop-filter";
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";


function Support() {
          const [sidebar, setSidebar] = useState(true);
          const [imgData, setImgData] = useState(SupportData);





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

                    <HorizontalScroll style={{float: 'left'}}>
                    {imgData.map(item =>
                    <div style={{margin: '1%', textAlign: 'center'}}>
                    <h2 id="white">{item.title}</h2>
                    <img  src={item.image} alt="sup" style={{width: '100vh'}}/>

                    <div>
                    <h2 id="white">{item.text}</h2>
                    </div>
                    </div>

                    )}
                    </HorizontalScroll>





                </div>

       </>
  );
}

export default Support;