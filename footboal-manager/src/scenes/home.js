import * as React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Home() {



  return (

 <div className="Panel">
        <form>
        <h2>Create Profile</h2>
          <div className="form-group">
            <label >Name</label>
            <br/>
            <input type="text" className="form-control"  placeholder="user" />
          </div>
          <br/>
          <div className="form-group">
            <label >Select Team</label>
            <br/>
            <select className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </form>
        <br/>
        <br/>
        <nav> <Link to={"/main"} className="navbar-brand">
          <button type="button" className="btn btn-primary" style={{width: '20vh'}} >Play</button>
        </Link></nav>



   </div>
  );
}

export default Home;