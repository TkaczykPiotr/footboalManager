import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { useToasts } from "react-toast-notifications";
import ModalExit from '../modal/modalExit';
import '../css/Navbar.css';
import BackdropFilter from "react-backdrop-filter";
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import {useNavigate} from "react-router";



function Training() {
          let navigate = useNavigate();
          const [sidebar, setSidebar] = useState(true);
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')));
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerProperties, setPlayerProperties] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [playerId, setPlayerId] = useState();
          const { addToast } = useToasts();
          const child = { width: `22em`, height: `100%` };

          const addPace = (id) => {
        addToast("Add Pace", {
          appearance: "success",
          autoDismiss: true
        });
          if(playerProperties.filter(a => a.id==id).map(item => item.pac) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 95000){
          playerProperties.filter(a => a.id==id).map(item => item.pac = item.pac + 1);
          teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 95000)
          localStorage.setItem("teamData", JSON.stringify(teamData));
          localStorage.setItem("playerPro", JSON.stringify(playerProperties));
          navigate('/training');
          }}
          const addPas = (id) => {
           addToast("Add Passing", {
                    appearance: "success",
                    autoDismiss: true
                  });
          if(playerProperties.filter(a => a.id==id).map(item => item.pas) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 55000){
          playerProperties.filter(a => a.id==id).map(item => item.pas = item.pas + 1);
          teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 55000)
          localStorage.setItem("teamData", JSON.stringify(teamData));
          localStorage.setItem("playerPro", JSON.stringify(playerProperties));
          navigate('/training');
          }}
          const addSho = (id) => {
           addToast("Add Shotting", {
                    appearance: "success",
                    autoDismiss: true
                  });
          if(playerProperties.filter(a => a.id==id).map(item => item.sho) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 250000){
          playerProperties.filter(a => a.id==id).map(item => item.sho = item.sho + 1);
          teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 250000)
          localStorage.setItem("teamData", JSON.stringify(teamData));
          localStorage.setItem("playerPro", JSON.stringify(playerProperties));
          navigate('/training');
          }}
          const addDri = (id) => {
           addToast("Add Dribbling", {
                    appearance: "success",
                    autoDismiss: true
                  });
           if(playerProperties.filter(a => a.id==id).map(item => item.dri) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 120000){
           playerProperties.filter(a => a.id==id).map(item => item.dri = item.dri + 1);
           teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 120000)
           localStorage.setItem("teamData", JSON.stringify(teamData));
           localStorage.setItem("playerPro", JSON.stringify(playerProperties));
           navigate('/training');
           }}
         const addDef = (id) => {
          addToast("Add Defending", {
                   appearance: "success",
                   autoDismiss: true
                 });
           if(playerProperties.filter(a => a.id==id).map(item => item.def) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 80000){
           playerProperties.filter(a => a.id==id).map(item => item.def = item.def + 1);
           teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 80000)
           localStorage.setItem("teamData", JSON.stringify(teamData));
           localStorage.setItem("playerPro", JSON.stringify(playerProperties));
           navigate('/training');
           }}
        const addPsy = (id) => {
         addToast("Add Physic", {
                  appearance: "success",
                  autoDismiss: true
                });
           if(playerProperties.filter(a => a.id==id).map(item => item.psy) < 100 && teamData.filter(a => a.id==team).map(item => item.budget) > 160000){
           playerProperties.filter(a => a.id==id).map(item => item.psy = item.psy + 1);
           teamData.filter(a => a.id==team).map(item => item.budget = item.budget - 160000)
           localStorage.setItem("teamData", JSON.stringify(teamData));
           localStorage.setItem("playerPro", JSON.stringify(playerProperties));
           navigate('/training');
           }}
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
                   </div>


                    <div className="PlayerInfoSl" style={{background: '#487a82'}}>
                     <div style={{float:'left', width: '100%', height: '80%'}}>
                      {player.filter(t => t.id==playerId)
                      .map(item =>
                       <div>
                       <img className="ImgCardPlayer" src={item.image} alt="player" style={{float:'left', margin: '5%', border: 'solid'}}/>
                       <div key={item.id} style={{float:'left',  margin: '5%'}}>
                       <h3 style={{color: '#fff' }}>Name: {item.name}</h3>
                        {playerProperties.filter(t => t.id==playerId)
                        .map(itemPro =>
                        <div>
                        <h3 id="white">Pace: {itemPro.pac} <button className="btn btn-primary btn-lg" type="button" onClick={() => addPace(itemPro.id)}>Add</button></h3>
                        <h3 id="white">Passing: {itemPro.pas} <button className="btn btn-primary btn-lg" type="button" onClick={() => addPas(itemPro.id)}>Add</button></h3>
                        <h3 id="white">Shotting: {itemPro.sho} <button className="btn btn-primary btn-lg" type="button" onClick={() => addSho(itemPro.id)}>Add</button></h3>
                        <h3 id="white">Dribbling: {itemPro.dri} <button className="btn btn-primary btn-lg" type="button" onClick={() => addDri(itemPro.id)}>Add</button></h3>
                        <h3 id="white">Defending: {itemPro.def} <button className="btn btn-primary btn-lg" type="button" onClick={() => addDef(itemPro.id)}>Add</button></h3>
                        <h3 id="white">Physical: {itemPro.psy} <button className="btn btn-primary btn-lg" type="button" onClick={() => addPsy(itemPro.id)}>Add</button></h3>
                         </div>
                        )}

                        </div>
                        </div>
                        )}

                     </div>

                        <div style={{position: 'fixed', marginLeft: '50%',marginTop: '4%', width: '30%', height: '40%'}}>
                        <h2 id="white">Legend Cost</h2>
                        <h3 id="white">Pace: 95000 Euro</h3>
                        <h3 id="white">Passing: 55000 Euro</h3>
                        <h3 id="white">Shotting: 250000 Euro</h3>
                        <h3 id="white">Dribbling: 120000 Euro</h3>
                        <h3 id="white">Defending: 80000 Euro</h3>
                        <h3 id="white">Psychical: 160000 Euro</h3>
                        <br/>
                        <h3 id="white">Budget: {teamData.filter(a => a.id==team).map(item => item.budget)} Euro</h3>

                         </div>

                    </div>


                </div>

       </>
  );
}

export default Training;