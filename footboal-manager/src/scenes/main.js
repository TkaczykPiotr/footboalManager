import * as React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Main() {
  return (
     <>
           <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px", float: "left"}}>
                  <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                 <span className="fs-4">Sidebar</span>
                 </a>
                 <ul className="nav nav-pills flex-column mb-auto" aria-current="page">
                      <li style={{background: "#f321"}}>
                      <Link to={"/main"} className="navbar-brand">
                           Main
                       </Link>
                      </li>
                      <br/>
                      <li style={{background: "#f321"}}>
                       <Link to={"/profile"} className="navbar-brand" s>
                            Profile
                        </Link>
                      </li>
                 </ul>
             </div>

       </>
  );
}

export default Main;