import * as React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./scenes/home.js"
import Main from "./scenes/main.js"
import Team from "./scenes/team.js"
import Transfer from "./scenes/transfer.js"
import Liga from "./scenes/liga.js"
import Statistic from "./scenes/statistic.js"
import Support from "./scenes/support.js"
import GamePlay from "./scenes/gameplay.js"
import Training from "./scenes/training.js"
import ExitModal from "./modal/modalExit.js"
import MatchModal from "./modal/modalMatch.js"
import EndModal from "./modal/modalEnd.js"
import ModalStartMatch from "./modal/modalStartMatch.js"

function App() {


  return (
    <div className="App"  >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/team" element={<Team />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/liga" element={<Liga />} />
        <Route path="/support" element={<Support />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/gameplay" element={<GamePlay />} />
        <Route path="/exitModal" element={<ExitModal />} />
        <Route path="/matchModal" element={<MatchModal />} />
        <Route path="/modalStartMatch" element={<ModalStartMatch />} />
        <Route path="/modalEnd" element={<EndModal />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </div>
  );
}

export default App;