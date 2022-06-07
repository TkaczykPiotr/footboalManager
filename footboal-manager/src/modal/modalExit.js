import React, { useState } from 'react';
import "./modal.css";
import { Link } from 'react-router-dom';

function ModalExit() {

    const removeItem = () =>{
    localStorage.removeItem("playerData");
    localStorage.removeItem("system442");
   localStorage.removeItem("system343");
    localStorage.removeItem("system532");
    localStorage.removeItem("table");
    localStorage.removeItem("user");
    localStorage.removeItem("round");
    localStorage.removeItem("matchesData");
    localStorage.removeItem("teamData");
    localStorage.removeItem("playerPro");
    }

  return (
     <>
     <div className="modalBackground">
     <div className="modalContainer">
     <div className="titleCloseBtn">
      <Link to='/main' >
                         <button>X
                         </button>
                       </Link>
                  </div>
     <div className="title">
     <h1>Are You Sure You Want To Leave?</h1>
     </div>
     <div className="body">
     <p>If you leave you end game!</p>
     </div>
     <div className="footer">
     <Link to='/' ><button onClick={()=> removeItem()} id="cancelBtn" >Yes</button></Link>
     <Link to='/main' ><button >No</button></Link>
     </div>
     </div>
     </div>
     </>
)
}

export default ModalExit;