import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { MatchesData } from '../data/MatchesData';

import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import  PlayerChartData  from '../data/PlayerChartData';
import  MatchesChartData  from '../data/MatchesChartData';
import ModalMatch  from '../modal/modalMatch';
import {useNavigate} from "react-router";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';


function GamePlay() {
          let navigate = useNavigate();
          const [start, setStart] = useState(false);
          const [sidebar, setSidebar] = useState(true);
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerPro, setPlayerPro] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));
          const [teamData, setTeamData] = useState(JSON.parse(localStorage.getItem('teamData')));
          const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('table')))
          const itemRowsEnemy = [];
          const itemRowsTeam = [];
          const [systemEnemy, setSystemEnemy] = useState(JSON.parse(localStorage.getItem('systemEnemy')));
          const [systemTeam, setSystemTeam] = useState(JSON.parse(localStorage.getItem('systemTeam442')));
          const [selectedValue, setSelectedValue] = useState(1);
          const [copySuccess, setCopySuccess] = useState('');

          const [matchId, setMatchId] = useState(matchData
          .filter(a=> a.round == JSON.parse(localStorage.getItem('round'))
          && a.idTeam==JSON.parse(localStorage.getItem('user')).team)
          .map(item=> item.id));

          const [teamOneName, setTeamOneName] = useState(teamData.filter(a => a.id==team).map(item => item));
          const [teamTwoName, setTeamTwoName] = useState(teamData.filter(a => a.id==matchData
                                                                                              .filter(s => s.idTeam != team && s.id==matchId)
                                                                                              .map(item => item.idTeam)).map(item => item));
           const [teamOneTable, setTeamOneTable] = useState(tableData.filter(a => a.id==team).map(item => item));
           const [teamTwoTable, setTeamTwoTable] = useState(tableData.filter(a => a.id==matchData
                                                                                                 .filter(s => s.idTeam != team && s.id==matchId)
                                                                                                 .map(item => item.idTeam)).map(item => item));

          const [teamOneData, setTeamOneData] = useState(matchData
          .filter(a => a.idTeam==JSON.parse(localStorage.getItem('user')).team
          && a.round==JSON.parse(localStorage.getItem('round')))
          .map(item => item));

          const [teamTwoData, setTeamTwoData] = useState(matchData
          .filter(a => a.idTeam == matchData
          .filter(s => s.idTeam != team && s.id==matchId)
          .map(item => item.idTeam) && a.round==JSON.parse(localStorage.getItem('round')))
          .map(item => item));



          const [playerPlay, setPlayerPlay] = useState(playerPro
          .filter(t => t.play===true && t.idTeam==JSON.parse(localStorage.getItem('user')).team)
          .map((data) => data)
          );

          const [playerAwayPlay, setPlayerAwayPlay] = useState(
          playerPro.filter(t => t.play===true && t.idTeam==matchData.filter(s =>
          s.idTeam != team && s.id==matchId).map(item => item.idTeam)).map((data) => data)
          );

          const child = { width: `21em`, height: `100%` };
          const [time, setTime] = useState(0);

          const [teamOneMatchesData, setTeamOneMatchesData] =  useState({
                    labels: ['','','','','','','','',''],
                    datasets: [
                    {
                     label: '',
                     data: [teamOneData[0].score,0,teamOneData[0].shotAtGoal,teamOneData[0].accurateShots,teamOneData[0].fouls,teamOneData[0].freeKicks,teamOneData[0].yellowCards,teamOneData[0].corners,teamOneData[0].offsides],
                     backgroundColor: ["#0d6efd"],
                     borderColor: "black",
                     borderWidth: 2,
                     width: 10,
                     }, ], },
                     );
          const [teamTwoMatchesData, setTeamTwoMatchesData] =  useState({
                     labels: ['','','','','','','','',''],
                     datasets: [
                     {
                     label: '',
                     data: [teamTwoData[0].score,0,teamTwoData[0].shotAtGoal,teamTwoData[0].accurateShots,teamOneData[0].fouls,teamTwoData[0].freeKicks,teamTwoData[0].yellowCards,teamTwoData[0].corners,teamTwoData[0].offsides],
                     backgroundColor: ["#bf1b2e"],
                     borderColor: "black",
                     borderWidth: 2,
                     width: 10,
                     }, ], },
                    );

             const tableSet = () =>{
                                     var win1 = 0, lose1 = 0, draw1 = 0, points1=0;
                                     var win2 = 0, lose2 = 0, draw2 = 0, points2=0;

                                     if(teamOneData[0].score>teamTwoData[0].score){
                                     localStorage.setItem("result", JSON.stringify("Win"));
                                     points1 = 3;
                                     win1 = 1;
                                     lose2 = 1;
                                     }
                                     if(teamOneData[0].score==teamTwoData[0].score){
                                     localStorage.setItem("result", JSON.stringify("Draw"));
                                     points1 = 1;
                                     points2 = 1;
                                     draw1 = 1;
                                     draw2 = 1;
                                     }
                                     if(teamOneData[0].score<teamTwoData[0].score){
                                     localStorage.setItem("result", JSON.stringify("Loose"));
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

            const sleep = ms => new Promise(res => setTimeout(res, ms));
            const doSomething = async () => {

                                  await sleep(1000)
                                  localStorage.setItem("matchesData", JSON.stringify(matchData));
                                  localStorage.setItem("table", JSON.stringify(tableData));
                                  navigate('/matchModal');

                                }





                useEffect(() => {

                if(start){
                  if(time<20){
                      const interval = setInterval(() => {
                                  setTime(time => time+1);
                                    engine();
                                    setTeamOneMatchesData({
                                       labels: ['','','','','','','','',''],
                                       datasets: [
                                       {
                                       label: '',
                                       data: [teamOneData[0].score,0,teamOneData[0].shotAtGoal,teamOneData[0].accurateShots,teamOneData[0].fouls,teamOneData[0].freeKicks,teamOneData[0].yellowCards,teamOneData[0].corners,teamOneData[0].offsides],
                                       backgroundColor: ["#0d6efd"],
                                       borderColor: "black",
                                       borderWidth: 2,
                                       width: 10,
                                       }],}
                                       );
                                       setTeamTwoMatchesData({
                                       labels: ['','','','','','','','',''],
                                       datasets: [
                                       {
                                       label: '',
                                       data: [teamTwoData[0].score,0,teamTwoData[0].shotAtGoal,teamTwoData[0].accurateShots,teamTwoData[0].fouls,teamTwoData[0].freeKicks,teamTwoData[0].yellowCards,teamTwoData[0].corners,teamTwoData[0].offsides],
                                       backgroundColor: ["#bf1b2e"],
                                       borderColor: "black",
                                       borderWidth: 2,
                                       width: 10,
                                       }],}
                                    );
                                  }, 1000);
                           return () => clearInterval(interval);
                    }
                    if(time==20){
                    tableSet();
                    doSomething();

                    }


                    }}, [time, start]);



            function engine() {

            //zmienne do konkretnych properties
            //pierwsza druzyna
                 var pac1, pas1,sho1,dri1 ,def1, psy1;
                 var pac11=0, pas11=0, sho11=0, dri11=0, def11=0, psy11=0;
                    pac1 = playerPlay.map(t => t.pac);
                    pas1 = playerPlay.map(t => t.pas);
                    sho1 = playerPlay.map(t => t.sho);
                    dri1 = playerPlay.map(t => t.dri);
                    def1 = playerPlay.map(t => t.def);
                    psy1 = playerPlay.map(t => t.psy);
                    for(var i=0 ; i<11; i++){
                     pac11 = pac11+pac1[i];
                     pas11 = pas11+pas1[i];
                     sho11 = sho11+sho1[i];
                     dri11 = dri11+dri1[i];
                     def11 = def11+def1[i];
                     psy11 = psy11+psy1[i];
                    }
                    //druga druzyna
                   var pac2, pas2,sho2,dri2 ,def2, psy2;
                   var pac22=0, pas22=0, sho22=0, dri22=0, def22=0, psy22=0;
                   pac2 = playerAwayPlay.map(t => t.pac);
                   pas2 = playerAwayPlay.map(t => t.pas);
                   sho2 = playerAwayPlay.map(t => t.sho);
                   dri2 = playerAwayPlay.map(t => t.dri);
                   def2 = playerAwayPlay.map(t => t.def);
                   psy2 = playerAwayPlay.map(t => t.psy);

                   for(var i=0 ; i<11; i++){
                   pac22 = pac22+pac2[i];
                   pas22 = pas22+pas2[i];
                   sho22 = sho22+sho2[i];
                   dri22 = dri22+dri2[i];
                   def22 = def22+def2[i];
                   psy22 = psy22+psy2[i];
                   }

                 //porownuje obie druzyny z kazdego propertisa dodajac losowa liczbe tak aby czasem wylosowac ta słabsza
                 //wynik która duzyna lepsza przypisuje do tablicy

                var whoBet = new Array(6);
                whoBet[0] = condition((pac11+randomNum(0, 100)), (pac22+randomNum(0, 100)));
                whoBet[1] = condition((pas11+randomNum(0, 100)), (pas22+randomNum(0, 100)));
                whoBet[2] = condition((sho11+randomNum(0, 100)), (sho22+randomNum(0, 100)));
                whoBet[3] = condition((dri11+randomNum(0, 100)), (dri22+randomNum(0, 100)));
                whoBet[4] = condition((def11+randomNum(0, 100)), (def22+randomNum(0, 100)));
                whoBet[5] = condition((psy11+randomNum(0, 100)), (psy22+randomNum(0, 100)));

                // tworze tablice szans dla obu druzyn na poszczegolne wydarzenie np. zolta kartka, gol
                //sprawdzam ktora druzyna wygrala w danym propertisie i zwiekszam szanse na wylosowanie poszczegolnych wydarzenw meczu w obu duzynach

                //  goal,strzaly na bramke, celne strzaly,faule,wolne,,kartki,,rozne,spalone
                var oneChance = [2,12,6,22,27,32,47,52];
                var twoChance = [2,12,6,22,27,32,47,52];

               if(whoBet[0]==1){
                oneChance[0] = oneChance[0] + 1;
                oneChance[1] = oneChance[1] + 1;
                oneChance[2] = oneChance[2] + 1;
                oneChance[6] = oneChance[6] + 1;
               }
            if(whoBet[1]==1){
               oneChance[0] = oneChance[0] + 1;
               oneChance[1] = oneChance[1] + 1;
               oneChance[2] = oneChance[2] + 1;
               oneChance[4] = oneChance[4] + 1;
             }
            if(whoBet[2]==1){
              oneChance[0] = oneChance[0] + 1;
              oneChance[1] = oneChance[1] + 1;
              oneChance[2] = oneChance[2] + 1;
              oneChance[6] = oneChance[6] + 1;
             }
           if(whoBet[3]==1){
             oneChance[0] = oneChance[0] + 1;
             oneChance[2] = oneChance[2] + 1;
             oneChance[4] = oneChance[4] + 1;
             oneChance[7] = oneChance[7] + 1;
           }
           if(whoBet[4]==1){
             oneChance[3] = oneChance[3] + 1;
             oneChance[4] = oneChance[4] + 1;
             oneChance[5] = oneChance[5] + 1;
           }
           if(whoBet[5]==1){
             oneChance[3] = oneChance[3] + 1;
             oneChance[4] = oneChance[4] + 1;
             oneChance[5] = oneChance[5] + 1;
             oneChance[6] = oneChance[6] + 1;
            }
            //2 duzyna
            if(whoBet[0]==2){
            twoChance[0] = twoChance[0] + 1;
            twoChance[1] = twoChance[1] + 1;
            twoChance[2] = twoChance[2] + 1;
            twoChance[6] = twoChance[6] + 1;
            }
            if(whoBet[1]==2){
            twoChance[0] = twoChance[0] + 1;
            twoChance[1] = twoChance[1] + 1;
            twoChance[2] = twoChance[2] + 1;
            twoChance[4] = twoChance[4] + 1;
            }
            if(whoBet[2]==2){
            twoChance[0] = twoChance[0] + 1;
            twoChance[1] = twoChance[1] + 1;
            twoChance[2] = twoChance[2] + 1;
            twoChance[6] = twoChance[6] + 1;
            }
            if(whoBet[3]==2){
            twoChance[0] = twoChance[0] + 1;
            twoChance[2] = twoChance[2] + 1;
            twoChance[4] = twoChance[4] + 1;
            twoChance[7] = twoChance[7] + 1;
            }
            if(whoBet[4]==2){
            twoChance[3] = twoChance[3] + 1;
            twoChance[4] = twoChance[4] + 1;
            twoChance[5] = twoChance[5] + 1;
            }
            if(whoBet[5]==2){
            twoChance[3] = twoChance[3] + 1;
            twoChance[4] = twoChance[4] + 1;
            twoChance[5] = twoChance[5] + 1;
            twoChance[6] = twoChance[6] + 1;
            }

              //każda szanse sprawdzam czy wystapila jesli tak to przypisuje do state duzyny jej dodatkowy wydarzenie

               var a =  randomNum(0, 100);
               if(a < oneChance[0] ){teamOneData.map(t => t.score =  t.score + 1 );}
               if(a < oneChance[1] ){teamOneData.map(t => t.shotAtGoal =  t.shotAtGoal + 1 );}
               if(a < oneChance[2] ){teamOneData.map(t => t.accurateShots =  t.accurateShots + 1 );}
               if(a < oneChance[3] && a>10){teamOneData.map(t => t.fouls =  t.fouls + 1 );}
               if(a < oneChance[4] && a>22){teamOneData.map(t => t.freeKicks =  t.freeKicks + 1 );}
               if(a < oneChance[5] && a>27){teamOneData.map(t => t.yellowCards =  t.yellowCards + 1 );}
               if(a < oneChance[6] && a>35){teamOneData.map(t => t.corners =  t.corners + 1 );}
               if(a < oneChance[7] && a>47){teamOneData.map(t => t.offsides =  t.offsides + 1 );}
               if(a < 50){
               teamOneData.map(t => t.possession =  t.possession + 1 );
               teamTwoData.map(t => t.possession =  t.possession - 1 );
               }else{
               teamTwoData.map(t => t.possession =  t.possession + 1 );
               teamOneData.map(t => t.possession =  t.possession - 1 );
               }

                var b =  randomNum(0, 100);
                 if(b < twoChance[0] ){teamTwoData.map(t => t.score =  t.score + 1 );}
                 if(b < twoChance[1] ){teamTwoData.map(t => t.shotAtGoal =  t.shotAtGoal + 1 );}
                 if(b < twoChance[2] ){teamTwoData.map(t => t.accurateShots =  t.accurateShots + 1 );}
                 if(b < twoChance[3] && b>10 ){ teamTwoData.map(t => t.fouls =  t.fouls + 1 );}
                 if(b < twoChance[4] && b>22){teamTwoData.map(t => t.freeKicks =  t.freeKicks + 1 );}
                 if(b < twoChance[5] && b>27){teamTwoData.map(t => t.yellowCards =  t.yellowCards + 1 );}
                 if(b < twoChance[6] && b>35){teamTwoData.map(t => t.corners =  t.corners + 1 );}
                 if(b < twoChance[7] && b>47){teamTwoData.map(t => t.offsides =  t.offsides + 1 );
}

               //na koniec wyswietlanie statow
               //a potem po meczu zapisanie wynikow do druzyn

            }

            function condition(one, two){
               if(one >= two){
               return 1;
               }else if(one < two){
                return 2;
                }
            }
            function randomNum(min, max) {
                       	return Math.floor(Math.random() * (max - min)) + min;
                       }

             const copyToClipBoard = (copyMe)  => {
                 navigator.clipboard.writeText(copyMe);
                  setCopySuccess(copyMe);
               };


                const onPaste = (numberl)  =>{
                 systemTeam.map(t => t.number == numberl && (t.number = copySuccess));
                 setSystemTeam([...systemTeam], systemTeam);
                }


            const swapSystem = e =>{
               setSelectedValue(e.target.value);
               if(e.target.value==1){setSystemTeam(JSON.parse(localStorage.getItem('systemTeam442')));}
               if(e.target.value==2){setSystemTeam(JSON.parse(localStorage.getItem('systemTeam343')));}
               if(e.target.value==3){ setSystemTeam(JSON.parse(localStorage.getItem('systemTeam531')));}
               }



        for(let i of Object.values(systemEnemy)){
                            const grid = [
                            <div className="fields"  key={i}>
                            {i.visible && (
                            <button id="white" className="circleField" style={{background: '#0d6efd'}}>{i.number}</button>)}
                            </div>
                            ];
                             itemRowsEnemy.push(grid);
                            }
         for(let i of Object.values(systemTeam)){
                            const grid = [
                            <div className="fields"  key={i}>
                            {i.visible && (
                            <button className="circleField" onClick={() => onPaste(i.number)}>{i.number}</button>)}
                            </div>
                            ];
                             itemRowsTeam.push(grid);
                            }



  return (
     <>
     <div>
              <IconContext.Provider value={{ color: '#fff' }}>
                     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{width: '20%'}}>
                       <ul className='nav-menu-items' >
                       <br/>
                             <li  className="nav-text">
                               <Link to='/main'>
                                    <ImIcons.ImExit />
                                 <span>Leave</span>
                               </Link>
                             </li>
                             <li  className="nav-text">
                               <Link to='' onClick={()=> setStart(true)}>
                               <MdIcons.MdNotStarted />
                                <span>Start</span>
                               </Link>
                             </li>

                              <li  className="nav-text">
                              <Link to='' onClick={()=> setStart(false)}>
                              <BsIcons.BsFillStopFill />
                              <span>Stop</span>
                              </Link>
                              </li>
                              <li  className="nav-text">
                               <a style={{color: '#f5f5f5'}}>
                              <ImIcons.ImExit />
                              <span>System </span>
                                   <select defaultValue={selectedValue}  style={{width: '50%', marginLeft: '10%'}} onChange={swapSystem} >
                                   <option value={1}>4-4-2</option>
                                   <option value={2}>3-4-3</option>
                                   <option value={3}>5-3-1</option>
                                   </select>
                              </a>

                              </li>
                       </ul>
                     </nav>
                   </IconContext.Provider>
                    <div className="MainBox" style={{marginLeft: '384px'}}>
                    <div className="InfoTopBox">
                        <div style={{float: 'left', marginLeft: '30%'}}>
                        <img className="ImgCardPlayer" src={teamOneName[0].imageHerb} alt="herb"/>
                        </div>
                        <div style={{float: 'left', marginLeft: '2%',marginTop: '2%', width: '50px', height: '50px'}}>
                        <h2 id="white">{time}:00</h2>
                         <h2 id="white">{teamOneData[0].score}:{teamTwoData[0].score}</h2>
                         </div>
                         <div style={{float: 'left', marginLeft: '2%'}}>
                          <img className="ImgCardPlayer" src={teamTwoName[0].imageHerb} alt="herb"/>
                            </div>
                    </div>

                    <div className="Field">
                    <div style={{float: 'left',width: '50%', height: '100%'}}>
                    {itemRowsTeam}
                    </div>
                    <div style={{float: 'left',width: '50%', height: '100%'}}>
                    {itemRowsEnemy}
                    </div>
                     </div>
                     <div className="RightBoxTeam">

                        <br/>
                     <div style={{ width:'100%', height: '10%'}}>
                     <h2 id="white">{teamTwoName[0].name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{teamOneName[0].name}</h2>

                     </div>
                     <div style={{float:'left',
                     width: '40%',
                     height: '70%',

                     display: 'inline-block',
                     transform:'scale(-1,1)',
                     WebkitTransform:'scale(-1,1)',
                     MozTransform: 'scale(-1,1)',
                     OTransform: 'scale(-1,1)'}}>
                     <MatchesChartData chartData={teamTwoMatchesData}  />
                    </div>

                    <div style={{float:'left', width:'130px', height: '70%'}}>
                    <br />

                    <h6 id="white" style={{marginTop: '10px'}}>{teamTwoData[0].score} score {teamOneData[0].score}</h6>
                    <h6 id="white">{teamTwoData[0].possession} possession {teamOneData[0].possession}</h6>
                    <h6 id="white"> {teamTwoData[0].shotAtGoal} shotAtGoal {teamOneData[0].shotAtGoal}</h6>
                    <h6 id="white">{teamTwoData[0].accurateShots} accurateShots {teamOneData[0].accurateShots}</h6>
                    <h6 id="white">{teamTwoData[0].fouls} fouls {teamOneData[0].fouls}</h6>
                    <h6 id="white">{teamTwoData[0].freeKicks} freeKicks {teamOneData[0].freeKicks}</h6>
                    <h6 id="white">{teamTwoData[0].yellowCards} yellowCards {teamOneData[0].yellowCards}</h6>
                    <h6 id="white">{teamTwoData[0].corners} corners {teamOneData[0].corners}</h6>
                    <h6 id="white">{teamTwoData[0].offsides} offsides {teamOneData[0].offsides}</h6>
                    </div>

                    <div style={{float:'left', width: '40%', height:'70%'}}>
                     <MatchesChartData chartData={teamOneMatchesData} />
                      </div>

                     </div>
                     <div className="PlayerBox" >
                      <HorizontalScroll>
                        {player.filter(t => t.idTeam==team && t.play==false)
                         .map(item =>
                         <div key={item.id} className="CardPlayer" style={child} >
                         <img className="ImgCardPlayer" src={item.image} alt="player"/>
                         <div style={{float: 'left',margin:'0 auto'}}>
                         <h3 id="white">{item.name}
                         <button className="circle" style={{margin:'0 auto'}} onClick={() => copyToClipBoard(item.number)}>{item.number}</button>
                        </h3>
                        </div>
                        </div>
                       )}
                      </HorizontalScroll>
                     </div>

                    </div>

        </div>
       </>
  );
}

export default GamePlay;