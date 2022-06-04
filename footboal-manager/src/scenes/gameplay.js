import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../data/SidebarData';
import { MatchesData } from '../data/MatchesData';
import Engine from './engine';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HorizontalScroll from "react-scroll-horizontal";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as ImIcons from 'react-icons/im';


function GamePlay() {
          const [sidebar, setSidebar] = useState(true);
          const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('playerData')));
          const [playerPro, setPlayerPro] = useState(JSON.parse(localStorage.getItem('playerPro')));
          const [team, setTeam] = useState(JSON.parse(localStorage.getItem('user')).team);
          const [matchData, setMatchData] = useState(JSON.parse(localStorage.getItem('matchesData')));

          const [matchId, setMatchId] = useState(matchData
          .filter(a=> a.round == JSON.parse(localStorage.getItem('round'))
          && a.idTeam==JSON.parse(localStorage.getItem('user')).team)
          .map(item=> item.id));

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



                useEffect(() => {
                  if(time<90){
                      const interval = setInterval(() => {
                                  setTime(time => time+1);
                                    engine();
                                  }, 1000);
                           return () => clearInterval(interval);
                    } }, [time]);



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
                 console.log(dri11 + "druga" +dri22);

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

//            for(var i=0 ; i<6; i++){}
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
               if(a < oneChance[0] ){
                   teamOneData.map(t => t.score =  t.score + 1 );
                   setTeamOneData([...teamOneData], teamOneData);
               }
               if(a < oneChance[1] ){
                 teamOneData.map(t => t.shotAtGoal =  t.shotAtGoal + 1 );
                 setTeamOneData([...teamOneData], teamOneData);
               }
               if(a < oneChance[2] ){
                 teamOneData.map(t => t.accurateShots =  t.accurateShots + 1 );
                 setTeamOneData([...teamOneData], teamOneData);
              }
               if(a < oneChance[3] && a>10 ){
                  teamOneData.map(t => t.fouls =  t.fouls + 1 );
                  setTeamOneData([...teamOneData], teamOneData);
               }
              if(a < oneChance[4] && a>22){
                 teamOneData.map(t => t.freeKicks =  t.freeKicks + 1 );
                 setTeamOneData([...teamOneData], teamOneData);
              }
              if(a < oneChance[5] && a>27){
               teamOneData.map(t => t.yellowCards =  t.yellowCards + 1 );
                setTeamOneData([...teamOneData], teamOneData);
              }
              if(a < oneChance[6] && a>35){
                teamOneData.map(t => t.corners =  t.corners + 1 );
                setTeamOneData([...teamOneData], teamOneData);
              }
             if(a < oneChance[7] && a>47){
               teamOneData.map(t => t.offsides =  t.offsides + 1 );
                setTeamOneData([...teamOneData], teamOneData);
             }

                var b =  randomNum(0, 100);
                            if(b < twoChance[0] ){
                                teamTwoData.map(t => t.score =  t.score + 1 );
                                setTeamTwoData([...teamTwoData], teamTwoData);
                            }
                            if(b < twoChance[1] ){
                              teamTwoData.map(t => t.shotAtGoal =  t.shotAtGoal + 1 );
                              setTeamTwoData([...teamTwoData], teamTwoData);
                            }
                            if(b < twoChance[2] ){
                              teamTwoData.map(t => t.accurateShots =  t.accurateShots + 1 );
                              setTeamTwoData([...teamTwoData], teamTwoData);
                           }
                            if(b < twoChance[3] && b>10 ){
                               teamTwoData.map(t => t.fouls =  t.fouls + 1 );
                               setTeamTwoData([...teamTwoData], teamTwoData);
                            }
                           if(b < twoChance[4] && b>22){
                              teamTwoData.map(t => t.freeKicks =  t.freeKicks + 1 );
                              setTeamTwoData([...teamTwoData], teamTwoData);
                           }
                           if(b < twoChance[5] && b>27){
                            teamTwoData.map(t => t.yellowCards =  t.yellowCards + 1 );
                             setTeamTwoData([...teamTwoData], teamTwoData);
                           }
                           if(b < twoChance[6] && b>35){
                             teamTwoData.map(t => t.corners =  t.corners + 1 );
                             setTeamTwoData([...teamTwoData], teamTwoData);
                           }
                          if(b < twoChance[7] && b>47){
                            teamTwoData.map(t => t.offsides =  t.offsides + 1 );
                             setTeamTwoData([...teamTwoData], teamTwoData);
                          }

               //na koniec zostanie mi wyswietlenie statow
               //a potem po meczu zapisanie wynikow do druzyn

// //strzaly na bramke
//                if(i==1){}
//
//
//               //celne strzaly
//               if(i==2){}
//
//
//               //faule
//               if(i==3){}
//               //wolne
//               if(i==4){}
//               //kartki
//               if(i==5){}
//               //rozne
//               if(i==6){}
//               //spalone
//               if(i==7){}

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

//{console.log(teamOneData[0].fouls)}

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
                               <Link to='/main'>
                               <ImIcons.ImExit />
                                <span>Start</span>
                                </Link>
                             </li>
                              <li  className="nav-text">
                               <a style={{color: '#f5f5f5'}}>
                              <ImIcons.ImExit />
                              <span>System </span>
                                   <select  style={{width: '50%', marginLeft: '10%'}} >
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
                        <h2 style={{color: '#fff'}}>{time}:00</h2>
                         <h2 style={{color: '#fff'}}>{teamOneData[0].score}:{teamTwoData[0].score}</h2>
                    </div>

                    <div className="Field">
                    <thead>
                                              <tr>
                                                 <th> Team</th>
                                                 <th> score</th>
                                                  <th> possession</th>
                                                  <th> fouls</th>
                                                 <th> shotAtGoal</th>
                                                  <th> accurateShots</th>
                                                 <th> freeKicks</th>
                                                 <th> yellowCards</th>
                                                  <th> corners</th>
                                                <th> offsides</th>

                                                    </tr>
                                             </thead>
                                         <tbody>
                                         {
                                            <tr>
                                           <td>{teamTwoData[0].idTeam}</td>
                                            <td>{teamTwoData[0].score}</td>
                                            <td>{teamTwoData[0].possession}</td>
                                            <td>{teamTwoData[0].fouls}</td>
                                           <td>{teamTwoData[0].shotAtGoal}</td>
                                            <td>{teamTwoData[0].accurateShots}</td>
                                             <td>{teamTwoData[0].freeKicks}</td>
                                             <td>{teamTwoData[0].yellowCards}</td>
                                             <td>{teamTwoData[0].corners}</td>
                                             <td>{teamTwoData[0].offsides}</td>

                                             </tr>
                                             }
                                          </tbody>

                     </div>

                     <div className="RightBoxTeam">

                        <thead>
                          <tr>
                             <th> Team</th>
                             <th> score</th>
                              <th> possession</th>
                              <th> fouls</th>
                             <th> shotAtGoal</th>
                              <th> accurateShots</th>
                             <th> freeKicks</th>
                             <th> yellowCards</th>
                              <th> corners</th>
                            <th> offsides</th>

                                </tr>
                         </thead>
                     <tbody>
                     {
                        <tr>
                       <td>{teamOneData[0].idTeam}</td>
                        <td>{teamOneData[0].score}</td>
                        <td>{teamOneData[0].possession}</td>
                        <td>{teamOneData[0].fouls}</td>
                       <td>{teamOneData[0].shotAtGoal}</td>
                        <td>{teamOneData[0].accurateShots}</td>
                         <td>{teamOneData[0].freeKicks}</td>
                         <td>{teamOneData[0].yellowCards}</td>
                         <td>{teamOneData[0].corners}</td>
                         <td>{teamOneData[0].offsides}</td>

                         </tr>
                         }
                      </tbody>


                     <Engine />


                     </div>



                     <div className="PlayerBox" style={{background: '#6c757d'}} >
                      <HorizontalScroll>
                                                       {player.filter(t => t.idTeam==team)
                                                        .map(item =>
                                                        <div key={item.id} className="CardPlayer" style={child} >
                                                        <img className="ImgCardPlayer" src={item.image} alt="player"/>
                                                        <div style={{float: 'left',margin:'0 auto'}}>
                                                         <h3 style={{color: '#fff' }}>{item.name}
                                                         <button className="circle" style={{margin:'0 auto'}} >{item.number}</button>

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