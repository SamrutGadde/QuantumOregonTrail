import PropTypes from 'prop-types'

function StartGameMsg() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      Welcome to the Quantum Oregon Trail!
      <br/>
      You will have to make choices and manage your resources 
      <br/>
      to help your group of four members survive.
      <br/>
      Your goal is to reach the end of the trail with your group alive, 
      <br/>
      with as many resources as possible.
      <br/>
    </div>
  )
}

function RiverMsg() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      Your group has reached a river. You need to commit some materials to cross it.
      <br/>
      How much material do you want to commit?
      <br/>
      The more you commit, the more likely you are to cross the river!
    </div>
  )
}

function RiverPass() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      You have successfully crossed the river!
      <br/>
      You may have lost some materials, but your group is safe.
    </div>
  )
}

function RiverFail() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      <strong>Oh No!</strong>
      <br/>
      You have failed to cross the river.
      <br/>
      You have lost some materials, and some of your group has died.
    </div>
  )
}

function BanditMsg() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      You have encountered a bandit!
      <br/>
      They may let you pass if you give them some of your resources.
      <br/>
      Commit more resources to increase your chances of surviving!
    </div>
  )
}

function BanditPass() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      The bandit has accepted your materials!
      <br/>
      You may have lost some resources, but your group is safe.
    </div>
  )
}

function BanditFail() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      <strong>Oh No!</strong>
      <br/>
      You have failed to defeat the bandit.
      <br/>
      You have lost all of your materials!
    </div>
  )
}

function SicknessMsg() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      Someone in your group has gotten sick.
      <br/>
      You need to give them some medicine to treat them, or risk infecting the rest of your group.
    </div>
  )
}

function SicknessPass() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      You have successfully treated the sickness!
      <br/>
      You may have lost some medicine, but your group is safe.
    </div>
  )
}

function SicknessFail() {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      <strong>Oh No!</strong>
      <br/>
      You have failed to treat the sickness.
      <br/>
      You have lost some medicine, and some of your group has died of dysentery.
    </div>
  )
}

function GameOver({message}) {
  return (
    <div className="w-[95%] text-2xl select-none text-center leading-loose">
      <strong>Game Over!</strong>
      <br/>
      You have reached the end of the trail!
      <br/>
      Your group has {message.currency} currency, {message.materials} materials, and {message.medicine} medicine.
      <br/>
      Great job!
    </div>
  )
}

GameOver.propTypes = {
  message: PropTypes.object.isRequired,
}

export default function MessageLogic({ message }) {
  let action = message.message;
  console.log(message.message)

  if (action === "start_game") {
    return <StartGameMsg />;
  } else if (action === "start_river") {
    return <RiverMsg />;
  } else if (action === "pass_river") {
    return <RiverPass />;
  } else if (action === "fail_river") {
    return <RiverFail />;
  } else if (action === "start_bandits") {
    return <BanditMsg />;
  } else if (action === "pass_bandits") {
    return <BanditPass />;
  } else if (action === "fail_bandits") {
    return <BanditFail />;
  } else if (action === "start_sickness") {
    return <SicknessMsg />;
  } else if (action === "pass_sickness") {
    return <SicknessPass />;
  } else if (action === "fail_sickness") {
    return <SicknessFail />;
  } else if (action === "win") {
    return <GameOver message={message}/>;
  }
  
  return (
    <div>
      
    </div>
  )
}

MessageLogic.propTypes = {
  message: PropTypes.object.isRequired,
}


