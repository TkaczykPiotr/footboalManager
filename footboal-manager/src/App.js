import * as React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./scenes/home.js"
import Main from "./scenes/main.js"
import Team from "./scenes/team.js"
import Profile from "./scenes/profile.js"
import Liga from "./scenes/liga.js"
import Statistic from "./scenes/statistic.js"
import GamePlay from "./scenes/gameplay.js"


function App() {


  return (
    <div className="App"  >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/liga" element={<Liga />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/gameplay" element={<GamePlay />} />
      </Routes>


    </div>
  );
}

export default App;