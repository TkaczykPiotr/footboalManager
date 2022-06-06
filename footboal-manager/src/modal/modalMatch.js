import React, { useState } from 'react';
import "./modal.css";
import { Link } from 'react-router-dom';

function ModalMatch() {

    const [round, setRound] = useState(JSON.parse(localStorage.getItem('round')));
    const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));

    const nextRound = () => {
        //setRound(round+1);
        localStorage.setItem("round", JSON.stringify(round+1));

    }

  return (
     <>

     <div className="modalBackground">
     <div className="modalContainer">

     <div className="title">
     <h1>End Match</h1>
     </div>
     <div className="body">
     <p>Press ok to start next round!</p>
     </div>
     <div className="footer">
      <Link to='/main' ><button onClick={() => nextRound()}>OK</button></Link>
     </div>
     </div>
     </div>
     </>
)
}

export default ModalMatch;