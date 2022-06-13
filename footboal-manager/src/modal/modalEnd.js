import React, { useState, useEffect } from 'react';
import "./modal.css";
import { Link } from 'react-router-dom';

import {useNavigate} from "react-router";

function ModalEnd() {
        let navigate = useNavigate();
         const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
         const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')));
         const [teamOneData, setTeamOneData] = useState(teamData.filter(a => a.id==team).map(item => item));
         const [table, setTable] = useState(JSON.parse(localStorage.getItem('table')));



  return (
     <>

     <div className="modalBackground">

     <div className="modalContainer" style={{width: '50%',height: '80%', marginLeft:'10%'}}>

     <div className="title">
     <h1>The End</h1>
     </div>
     <div className="body" >
     <div id="white" style={{background: '#afccc2', borderRadius: '10px' }}>
                                          <h2 className="text-center">Final Table</h2>
                                             <br></br>
                                               <div className = "row" style={{width: '20%', marginLeft:'10%'}} >
                                               <table  className = "table table-striped table-bordered" style={{borderColor: 'black'}}>
                                               <thead>
                                                <tr>
                                                <th> Lp.</th>
                                        <th> Team</th>
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
                                          <td>{item.points}</td>

                                        </tr>
                                        )}
                                        </tbody>
                                    </table>
                                 </div>
                             </div>

     </div>
     <br/>
      <h2>Your Final Budget: {teamOneData[0].budget} Euro</h2>
      <h3>Press OK to start new game!</h3>
     <div className="footer">



     <Link to='/' ><button>OK</button></Link>


     </div>
     </div>
     </div>

     </>
)
}

export default ModalEnd;