import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';



function Liga() {
          const [sidebar, setSidebar] = useState(true);
          const [table, setTable] = useState(JSON.parse(localStorage.getItem('table')));




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
                    <div id="white" style={{background: '#afccc2', borderRadius: '10px' , marginBottom: '20%', margin: '5%'}}>
                                     <h2 className="text-center">Table</h2>
                                        <br></br>
                                          <div className = "row" style={{width: '1200px', marginLeft:'10%'}} >
                                          <table  className = "table table-striped table-bordered" style={{borderColor: 'black'}}>
                                          <thead>
                                           <tr>
                                           <th> Lp.</th>
                                   <th> Team</th>
                                   <th> Matches</th>
                                   <th> Win</th>
                                   <th> Draw</th>
                                   <th> Loose</th>
                                   <th> Goal</th>
                                  <th> Points</th>

                                    </tr>
                                  </thead>
                                 <tbody>
                                  {
                                  table
                                  .sort((a,b) => a.points < b.points ? 1:-1)
                                  .map((item, index)=>
                                   <tr key={index}>
                                     <td>{index+1}</td>
                                     <td>{item.name}</td>
                                     <td>{item.matches}</td>
                                     <td>{item.win}</td>
                                     <td>{item.draw}</td>
                                     <td>{item.loose}</td>
                                     <td>{item.goalScored}:{item.goalLoose}</td>
                                     <td>{item.points}</td>

                                   </tr>
                                   )}
                                   </tbody>
                               </table>
                            </div>
                        </div>
                    </div>

       </>
  );
}

export default Liga;