import { useState } from 'react'
import ChoiceCard from '../components/ChoiceCard';
import PropTypes from 'prop-types'
import wood from "../assets/wood.png";
import ingots from "../assets/ingots.png";
import med from "../assets/medicine.png";
import accept from "../assets/accept.png";
import deny from "../assets/deny.png";

export default function CardLogic({ message, sendMessage }) {
  let action = message.message;
  const MAX_MED_ALLOC = 5;
  const MAX_MAT_ALLOC = 300;
  const MAX_CUR_ALLOC = 300;

  function StartGameCard() {
    function handleStartGame () {
      console.log("start_game")
      message.message = "start_game";
      sendMessage(JSON.stringify(message));
    }

    return (
      <ChoiceCard title={"Start Game"} description={"Start the game!"} icon={accept} onClick={handleStartGame}/>
    )
  }

  function RiverEventCard() {
    const [commit, setCommit] = useState(0);
    const max_alloc = Math.min(message.materials, MAX_MAT_ALLOC);

    function handleRiverEvent() {
      console.log("commit_river")
      message.message = "commit_river";
      message.materials = message.materials - commit;
      sendMessage(JSON.stringify(message));
    }

    return (
      <div>
        <ChoiceCard title={"Commit"} description={"Commit some materials to cross the river!"} icon={wood} onClick={handleRiverEvent}/>
        <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_alloc} onChange={(e) => setCommit(e.target.value)}/>
        <div className="text-center text-2xl font-bold select-none">{commit}</div>
      </div>
    )
  }

  function BanditEventCard() {
    const [materials, setMaterials] = useState(0);
    const [currency, setCurrency] = useState(0);
    const [medicine, setMedicine] = useState(0);
    let max_med = Math.min(message.medicine, MAX_MED_ALLOC);
    let max_cur = Math.min(message.currency, MAX_CUR_ALLOC);
    let max_mat = Math.min(message.materials, MAX_MAT_ALLOC);


    function handleBanditEvent() {
      console.log("commit_bandit")
      message.message = "commit_bandit";
      message.materials = message.materials - materials;
      message.currency = message.currency - currency;
      message.medicine = message.medicine - medicine;
      sendMessage(JSON.stringify(message));
    }

    return (
      <div className="flex flex-row justify-around items-center">
        <div className="mx-[3rem]">
          <ChoiceCard title={"Material"} description={"Commit some Material to fend off the bandit!"} icon={wood} onClick={handleBanditEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_mat} onChange={(e) => setMaterials(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{materials}</div>
        </div>
        <div className="mx-[3rem]">
          <ChoiceCard title={"Currency"} description={"Commit some Currency to fend off the bandit!"} icon={ingots} onClick={handleBanditEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_cur} onChange={(e) => setCurrency(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{currency}</div>
        </div>
        <div className="mx-[3rem]">
          <ChoiceCard title={"Medicine"} description={"Commit some Medicine to fend off the bandit!"} icon={med} onClick={handleBanditEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_med} onChange={(e) => setMedicine(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{medicine}</div>
        </div>
      </div>

    )
  }

  function SicknessEventCard() {
    const [player1, setPlayer1] = useState(0);
    const [player2, setPlayer2] = useState(0);
    const [player3, setPlayer3] = useState(0);
    const [player4, setPlayer4] = useState(0);
    let max_alloc = Math.min(message.medicine, MAX_MED_ALLOC);

    function handleSicknessEvent() {
      console.log("commit_sickness")
      message.message = "commit_sickness";
      message.medicine = message.medicine - player1 - player2 - player3 - player4;
      message.player1 = player1;
      message.player2 = player2;
      message.player3 = player3;
      message.player4 = player4;
      sendMessage(JSON.stringify(message));
    }

    return (
      <div className="flex flex-row justify-around items-center">
        <div className="mx-[3rem]">
          <ChoiceCard title={"Group Member 1"} description={"Commit some Medicine to heal the sick!"} icon={med} onClick={handleSicknessEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_alloc} onChange={(e) => setPlayer1(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{player1}</div>
        </div>
        <div className="mx-[3rem]">
          <ChoiceCard title={"Group Member 2"} description={"Commit some Medicine to heal the sick!"} icon={med} onClick={handleSicknessEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_alloc} onChange={(e) => setPlayer2(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{player2}</div>
        </div>
        <div className="mx-[3rem]">
          <ChoiceCard title={"Group Member 3"} description={"Commit some Medicine to heal the sick!"} icon={med} onClick={handleSicknessEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_alloc} onChange={(e) => setPlayer3(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{player3}</div>
        </div>
        <div className="mx-[3rem]">
          <ChoiceCard title={"Group Member 4"} description={"Commit some Medicine to heal the sick!"} icon={med} onClick={handleSicknessEvent}/>
          <input type="range" className="w-full mt-4" defaultValue={0} min={0} max={max_alloc} onChange={(e) => setPlayer4(e.target.value)}/>
          <div className="text-center text-2xl font-bold select-none">{player4}</div>
        </div>
      </div>
    )
  }

  function PassCard() {
    
    function handlePass() {
      console.log("continuing...")
      message.message = "continue";
      sendMessage(JSON.stringify(message));
    }

    return (
      <ChoiceCard title={"Continue"} description={"Continue on your journey!"} icon={accept} onClick={handlePass}/>
    )
  }

  function FailCard() {
    return (
      <ChoiceCard title={"Failure"} description={"Restart from the beginning?"} icon={deny} onClick={() => window.location.reload()}/>
    )
  }

  function GameOver() {
    return (
      <ChoiceCard title={"Restart"} description={"Restart from the beginning?"} icon={accept} onClick={() => window.location.reload()}/>
    )
  }

  if (action === "start_game") {
    return <StartGameCard/>;
  } else if (action === "start_river") {
    return <RiverEventCard/>;
  } else if (action === "start_bandits") {
    return <BanditEventCard/>;
  } else if (action === "start_sickness") {
    return <SicknessEventCard/>;
  } else if (action.substring(0, 4) === "pass") {
    return <PassCard/>;
  } else if (action.substring(0, 4) === "fail") {
    return <FailCard/>;
  } else if (action === "win") {
    return <GameOver/>;
  }
  
  return (
    <div>
      
    </div>
  )
}

CardLogic.propTypes = {
  message: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
}
