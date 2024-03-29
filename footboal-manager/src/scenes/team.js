import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';

import  PlayerChartData  from '../data/PlayerChartData';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useToasts } from "react-toast-notifications";


function Team() {

          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerProperties, setPlayerProperties] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [system, setSystem] = useState(JSON.parse(localStorage.getItem('system442')));

          const [copySuccess, setCopySuccess] = useState('');
          const [selectedValue, setSelectedValue] = useState(1);
          const [playerId, setPlayerId] = useState(1);
          const { addToast } = useToasts();





          const [playerPropertiesData, setPlayerPropertiesData] =  useState({
          labels: player.filter(t => t.id===playerId && t.idTeam==JSON.parse(localStorage.getItem('user')).team).map((data) => data.name),
          datasets: [
          {
           label: "pace",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.pac),
           backgroundColor: ["rgba(75,192,192,1)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "passing",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.pas),
           backgroundColor: ["rgba(32,43,165,16)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "shotting",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.sho),
           backgroundColor: ["#bf1b2e"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "dribbling",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.dri),
           backgroundColor: ["rgba(75,123,165,1)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "defending",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.def),
           backgroundColor: ["#50AF95"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "physical",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.psy),
           backgroundColor: ["#80530a"],
           borderColor: "black",
           borderWidth: 2,
           },
           ],});

          useEffect(() => {
          setPlayerPropertiesData({

           labels: player.filter(t => t.id===playerId && t.idTeam==JSON.parse(localStorage.getItem('user')).team).map((data) => data.name),
           datasets: [
           {
           label: "pace",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.pac),
           backgroundColor: ["rgba(75,192,192,1)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "passing",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.pas),
           backgroundColor: ["rgba(32,43,165,16)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "shotting",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.sho),
           backgroundColor: ["#bf1b2e"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "dribbling",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.dri),
           backgroundColor: ["rgba(75,123,165,1)"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "defending",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.def),
           backgroundColor: ["#50AF95"],
           borderColor: "black",
           borderWidth: 2,
           },
           {
           label: "physical",
           data: playerProperties.filter(t => t.id===playerId).map((data) => data.psy),
           backgroundColor: ["#80530a"],
           borderColor: "black",
           borderWidth: 2,
           },

           ],
           });



           }, [playerId]);
           useEffect(() => {}, [system]);

          const [sidebar, setSidebar] = useState(true);

          const child = { width: `21em`, height: `100%` };
          const itemRows = [];


           const copyToClipBoard = (copyMe)  => {
               navigator.clipboard.writeText(copyMe);
                setCopySuccess(copyMe);
            };

           const takeId = (id)  => {
                    setPlayerId(id);
                    };

            const onPaste = (numberl)  =>{
            addToast("You have replaced player number " + numberl + " with " + copySuccess, {
                              appearance: "success",
                              autoDismiss: true
                            });

             system.map(t => t.number == numberl && (t.number = copySuccess));
             setSystem([...system], system);
            }

            const swapSystem = e =>{
            setSelectedValue(e.target.value);
            if(e.target.value==1){
            setSystem(JSON.parse(localStorage.getItem('system442')));
            }
            if(e.target.value==2){
            setSystem(JSON.parse(localStorage.getItem('system343')));
            }
            if(e.target.value==3){
            setSystem(JSON.parse(localStorage.getItem('system532')));
            }
            }

            const saveSystem = () =>{

             if(selectedValue==1){
             addToast("You save system 4-4-2" , {
             appearance: "success",
             autoDismiss: true
             });
              localStorage.setItem("system442", JSON.stringify(system));
            }
            if(selectedValue==2){
            addToast("You save system 3-4-3" , {
            appearance: "success",
            autoDismiss: true
            });
           localStorage.setItem("system343", JSON.stringify(system));
            }
            if(selectedValue==3){
            addToast("You save system 5-3-2" , {
                        appearance: "success",
                        autoDismiss: true
                        });
             localStorage.setItem("system532", JSON.stringify(system));
             }
             }






          //setTeam(JSON.parse(localStorage.getItem('user')).team);


          for(let i of Object.values(system)){
                    const grid = [
                    <div className="fields" key={i}>
                    {i.visible && (
                    <button className="circleField" onClick={() => onPaste(i.number)}>{i.number}</button>)}
                    </div>
                    ];
                     itemRows.push(grid);
                    }



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
                                  {player.filter(t => t.idTeam==team )
                                   .map(item =>
                                   <div key={item.id} className="CardPlayer" style={child} onClick={() => takeId(item.id)}>
                                   <img className="ImgCardPlayer" src={item.image} alt="player"/>
                                   <div style={{float: 'left',margin:'0 auto'}}>
                                    <h3 style={{color: '#fff' }}>{item.name}
                                    <button className="circle" style={{margin:'0 auto'}} onClick={() => copyToClipBoard(item.number)}>{item.number}</button>

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
                        <div>
                                <label style={{color: '#fff'}} >Set System</label>
                                <br/>
                                    <select defaultValue={selectedValue} style={{width: '50%'}} onChange={swapSystem}>
                                      <option value={1}>4-4-2</option>
                                      <option value={2}>3-4-3</option>
                                      <option value={3}>5-3-2</option>

                                    </select>

                                    <button type="button" className="btn btn-primary" style={{marginLeft: '2%'}} onClick={() => saveSystem()}>Save</button>

                            </div>
                            <br/>
                            <br/>
                            <br/>
                        <div style={{float:'left', width: '30%', height: '60%'}}>
                        {player.filter(t => t.id==playerId && t.idTeam==JSON.parse(localStorage.getItem('user')).team)
                         .map(item =>
                         <div  >
                         <img className="ImgCardPlayer" src={item.image} alt="player"/>
                         <div key={item.id} style={{float: 'left',margin:'0 auto'}}>
                         <h3 style={{color: '#fff' }}>Position: {item.position}
                         <h4 style={{color: '#fff' }}>Cost: {item.cost} Euro</h4>
                          </h3>
                           </div>
                         </div>
                         )}


                        </div>
                        <div style={{marginLeft: '2%',float:'left', width: '60%', height: '50%'}}>
                        <PlayerChartData chartData={playerPropertiesData} />
                        </div>

                        </div>

                        <div className="BotBoxTeam" >


                         </div>


                    </div>

       </>
  );
}

export default Team;

