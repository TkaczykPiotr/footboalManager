import React, { useState, useEffect } from 'react';
import "./modal.css";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router";
function ModalStartMatch({ setOpenModal }) {


                     return (
                       <div className="modalBackground">
                         <div className="modalContainer">
                           <div className="titleCloseBtn">
                             <button
                               onClick={() => {
                                 setOpenModal(false);
                               }}
                             >
                               X
                             </button>
                           </div>
                           <div className="title">
                             <h1>Are You Sure You Want to Continue?</h1>
                           </div>
                           <div className="body">
                             <p>If you press start, the next round will start!</p>
                           </div>
                           <div className="footer">
                             <Link to='/gameplay' ><button >Start</button></Link>
                             <Link to='/main' ><button  id="cancelBtn">Cancel</button></Link>

                           </div>
                         </div>
                       </div>
                     );
                   }

export default ModalStartMatch;