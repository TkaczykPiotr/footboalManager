import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BackdropFilter from "react-backdrop-filter";
import { SystemPlayer532, SystemPlayer442, SystemPlayer343, SystemEnemy442, SystemTeam442 } from '../data/SystemPlayer';
import { PlayerData } from '../data/PlayerData';
import { TablesTeam } from '../data/TablesTeam';
import { MatchesData } from '../data/MatchesData';
import { PlayerProperties } from '../data/PlayerProperties';
import { TeamData } from '../data/TeamData';


function Home() {
       const [name, setName] = useState('user');
       const [team, setTeam] = useState(1);


       function setLocalStorage(){
                let user = {
                name: name,
                team: team
                }

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("system442", JSON.stringify(SystemPlayer442));
            localStorage.setItem("system343", JSON.stringify(SystemPlayer343));
            localStorage.setItem("system532", JSON.stringify(SystemPlayer532));
            localStorage.setItem("systemEnemy", JSON.stringify(SystemEnemy442));
            localStorage.setItem("systemTeam", JSON.stringify(SystemTeam442));
            localStorage.setItem("playerData", JSON.stringify(PlayerData));
            localStorage.setItem("table", JSON.stringify(TablesTeam));
            localStorage.setItem("matchesData", JSON.stringify(MatchesData));
            localStorage.setItem("playerPro", JSON.stringify(PlayerProperties));
            localStorage.setItem("teamData", JSON.stringify(TeamData));
            localStorage.setItem("round", JSON.stringify(1));


       }


  return (

 <div className="Panel">
  <BackdropFilter className="bluredForm" filter={"blur(20px) sepia(50%)"} style={{borderRadius: '10%'}}
  canvasFallback={true}  html2canvasOpts={{allowTaint: true}}>
    <br/>

        <form style={{width: "200px", margin: "0 auto"}}>
        <h2  style={{color: '#fff'}}>Create Profile</h2>
          <div className="form-group">
            <label style={{color: '#fff'}}>Name</label>
            <br/>
            <input type="text" name="name" className="form-control"  placeholder="user" onChange={(e) => setName(e.target.value)}/>
          </div>
          <br/>
          <div className="form-group">
            <label style={{color: '#fff'}}>Select Team</label>
            <br/>
            <select className="form-control" onChange={(e) => setTeam(e.target.value)}>
              <option value={1}>Barcelona</option>
              <option value={2}>Real Madrid</option>
              <option value={3}>Atletico Madrid</option>
              <option value={4}>Sevilla</option>
            </select>
          </div>
        </form>

        <br/>
        <br/>
        <nav> <Link to={"/main"} className="navbar-brand">
          <button type="button" onClick={setLocalStorage() } className="btn btn-primary" style={{width: '20vh'}} >Play</button>
        </Link></nav>
        <br/>
        <br/>
  </BackdropFilter>

   </div>

  );
}

export default Home;