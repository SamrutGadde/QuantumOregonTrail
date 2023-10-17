import "./App.css";
import { Link } from "react-router-dom";
import waveTop from "./assets/wave-top.svg";
import waveBottom from "./assets/wave-bottom.svg";


export default function App() {
  return (
    <div className="absolute h-screen w-screen">
      <img src={waveTop} className="absolute w-full -top-[20rem]" />
      <div className="relative h-screen w-screen flex justify-center items-center flex-col select-none z-10">
        <div className="flex flex-col bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 p-1 rounded-xl">
          <div className="h-full w-full bg-gray-800 px-[5rem] py-[2rem] rounded-xl">
            <div className="text-[7rem] text-center font-semibold">
              The{" "}
              <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 inline-block text-transparent bg-clip-text font-extrabold">
                Quantum
              </div>
            </div>
            <div className="text-[7rem] text-center font-semibold">
              Oregon Trail
            </div>

            <div className="flex flex-row justify-around mt-[4rem] mb-[2rem] mx-[1rem]">
              <Link
                to="game"
                className="btn-primary bg-purple-700 hover:bg-purple-900"
              >
                Start Game
              </Link>
            </div>
          </div>
        </div>
      </div>

      <img src={waveBottom} className="absolute w-full -bottom-[20rem] " />
    </div>
  );
}
