import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import ingots from "../assets/ingots.png";
import wood from "../assets/wood.png";
import med from "../assets/medicine.png";
import blobScene from "../assets/blob-scene.svg";
import MessageLogic from "../components/MessageLogic.jsx";
import CardLogic from "./CardLogic.jsx";

const socketUrl = "ws://localhost:8080/";

export default function Game() {
  const [message, setMessage] = useState({
    message: "start_game",
    materials: 1000,
    currency: 1000,
    medicine: 50,
  });
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage) {
      setMessage(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <img src={blobScene} className="absolute w-full h-full z-[-1] object-cover" />
      <div className="h-4/5 w-3/5 flex bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 p-1 rounded-xl">
        <div className="w-full h-full flex flex-col justify-around items-center bg-gray-900 px-[5rem] py-[2rem] rounded-xl">
        <div className="w-1/3 min-h-[3.5rem] bg-gray-800 rounded-full justify-center items-center flex flex-col p-3">
          <div className="text-2xl font-semibold">
            Resources
          </div>
          <div className="min-h-[3.5rem] bg-gray-800 rounded-full justify-center items-center flex flex-row p-3">
            <div className="flex flex-row justify-center items-center mx-5 font-bold text-2xl">
              <img src={ingots} className="h-[3rem] w-[3rem] mr-2" />
              {message.currency}
            </div>
            <div className="flex flex-row justify-center items-center mx-5 font-bold text-2xl">
              <img src={wood} className="h-[3rem] w-[3rem] mr-2" />
              {message.materials}
            </div>
            <div className="flex flex-row justify-center items-center mx-5 font-bold text-2xl">
              <img src={med} className="h-[3rem] w-[3rem] mr-2" />
              {message.medicine}
            </div>
          </div>
        </div>
          
          <div className="h-[25rem] w-1/2 bg-gray-800 rounded-2xl flex justify-center items-center">
            <MessageLogic message={message} />
          </div>
          <div className="flex justify-center items-center">
            <CardLogic message={message} sendMessage={sendMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
}
