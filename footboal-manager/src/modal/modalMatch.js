import React, { useState, useEffect } from 'react';
import "./modal.css";
import { Link } from 'react-router-dom';
import EngineOtherTeam from '../scenes/engineOtherTeam';
import {useNavigate} from "react-router";
function ModalMatch() {
        let navigate = useNavigate();
         const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
         const [playerData, setPlayerData] = useState(JSON.parse(localStorage.getItem('playerData')));
         const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));
         const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('table')))
         const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')))
         const [round, setRound] = useState(JSON.parse(localStorage.getItem('round')));
         const [matchId, setMatchId] = useState(matchData
                   .filter(a=> a.round == round
                  && a.id != matchData.filter(a => a.idTeam==team && a.round==round).map(item => item.id))
                   .map(item=> item.id));


         const [idTeam, setIdTeam] = useState(matchData
                                               .filter(a=> a.round == round&& a.id != matchData.filter(a => a.idTeam==team && a.round==round).map(item => item.id))
                                                .map(item=> item.idTeam));
         const [teamOneData, setTeamOneData] = useState(matchData
                  .filter(a => a.id==matchId[0] && a.idTeam == idTeam[0] && a.round==round)
                  .map(item => item));

         const [teamTwoData, setTeamTwoData] = useState(matchData
                  .filter(a => a.id==matchId[0] && a.idTeam == idTeam[1] && a.round==round)
                  .map(item => item));

         const [teamOneTable, setTeamOneTable] = useState(tableData.filter(a => a.id == idTeam[0] ).map(item => item));
         const [teamTwoTable, setTeamTwoTable] = useState(tableData.filter(a => a.id == idTeam[1] ).map(item => item));



    const nextRound = () => {
        playerPayment();
        engine();
        localStorage.setItem("round", JSON.stringify(round+1));

    }

    function engine() {
    teamProSet();
    teamTableSet();

    localStorage.setItem("matchesData", JSON.stringify(matchData));
    localStorage.setItem("table", JSON.stringify(tableData));
    }

    const playerPayment = () => {
    let pay=0;
    playerData.filter(a => a.idTeam == team).map(item =>  item.payment);
    for(var i=0 ; i<82;i++){
    if(playerData[i].idTeam==team){
        pay = pay + playerData[i].payment;
        }
    }

    teamData.filter(a => a.id == team).map(item =>  item.budget = item.budget - pay);
    localStorage.setItem("teamData", JSON.stringify(teamData));



    }

        const teamProSet = () => {

        teamOneData[0].score = randomNum(0, 5);
        teamOneData[0].possession = randomNum(0, 5);
        teamOneData[0].shotAtGoal = randomNum(0, 5);
        teamOneData[0].accurateShots = randomNum(0, 5);
        teamOneData[0].fouls = randomNum(0, 5);
        teamOneData[0].freeKicks = randomNum(0, 5);
        teamOneData[0].yellowCards = randomNum(0, 5);
        teamOneData[0].corners = randomNum(0, 5);
        teamOneData[0].offsides = randomNum(0, 5);


        teamTwoData[0].score = randomNum(0, 5);
        teamTwoData[0].possession = randomNum(0, 5);
        teamTwoData[0].shotAtGoal = randomNum(0, 5);
        teamTwoData[0].accurateShots = randomNum(0, 5);
        teamTwoData[0].fouls = randomNum(0, 5);
        teamTwoData[0].freeKicks = randomNum(0, 5);
        teamTwoData[0].yellowCards = randomNum(0, 5);
        teamTwoData[0].corners = randomNum(0, 5);
        teamTwoData[0].offsides = randomNum(0, 5);

        }
        function randomNum(min, max) {
                 return Math.floor(Math.random() * (max - min)) + min;
           }


    const teamTableSet = () => {

         var win1 = 0, lose1 = 0, draw1 = 0, points1=0;
         var win2 = 0, lose2 = 0, draw2 = 0, points2=0;

         if(teamOneData[0].score>teamTwoData[0].score){

            points1 = 3;
            win1 = 1;
            lose2 = 1;
          }
          if(teamOneData[0].score==teamTwoData[0].score){
            points1 = 1;
            points2 = 1;
            draw1 = 1;
            draw2 = 1;
          }
          if(teamOneData[0].score<teamTwoData[0].score){
            points2 = 3;
            win2 = 1;
            lose1 = 1;
          }

          teamOneTable.map(item => item.goalScored = teamOneData[0].score + teamOneTable[0].goalScored);
          teamOneTable.map(item => item.goalLoose =   teamOneTable[0].goalLoose + teamTwoData[0].score);
          teamOneTable.map(item => item.matches = teamOneTable[0].matches+1);
          teamOneTable.map(item => item.win = teamOneTable[0].win + win1);
          teamOneTable.map(item => item.loose = teamOneTable[0].loose + lose1);
          teamOneTable.map(item => item.draw = teamOneTable[0].draw + draw1);
          teamOneTable.map(item => item.points = teamOneTable[0].points+points1);


          teamTwoTable.map(item => item.goalScored =  teamTwoTable[0].goalScored + teamTwoData[0].score);
          teamTwoTable.map(item => item.goalLoose =  teamTwoTable[0].goalLoose + teamOneData[0].score);
          teamTwoTable.map(item => item.matches = teamTwoTable[0].matches+1);
          teamTwoTable.map(item => item.win = teamTwoTable[0].win + win2);
          teamTwoTable.map(item => item.loose = teamTwoTable[0].loose + lose2);
          teamTwoTable.map(item => item.draw = teamTwoTable[0].draw + draw2);
          teamTwoTable.map(item => item.points = teamTwoTable[0].points+points2);

        }


  return (
     <>

     <div className="modalBackground">

     <div className="modalContainer">

     <div className="title">
     <h1>You {JSON.parse(localStorage.getItem('result'))}</h1>
     </div>
     <div className="body">
     <p>Press ok to start next round!</p>
     </div>
     <div className="footer">
     {round<3 && (
      <Link to='/main' ><button onClick={() => nextRound()}>OK</button></Link>
      )}
      {round==3 && (
            <Link to='/modalEnd' ><button>OK</button></Link>
        )}

     </div>
     </div>
     </div>

     </>
)
}

export default ModalMatch;