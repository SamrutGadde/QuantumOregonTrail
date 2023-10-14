import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import './App.css'
import { Link } from 'react-router-dom'

// const socketUrl = 'ws://localhost:8080/'

export default function App() {
  const [message, setMessage] = useState("No Message")
  const [input, setInput] = useState("")

  // const { 
  //   sendMessage,
  //   lastMessage,
  // } = useWebSocket(socketUrl, {
  //   onOpen: () => {
  //     sendMessage(JSON.stringify({meta: "join", room: "test"}))
  //   },
  //   shouldReconnect: () => true,
  // })

  // const handleClick = (e) => {
  //   sendMessage(input)
  //   console.log(input)
  // }

  // useEffect(() => {
  //   if (lastMessage) {
  //     setMessage(lastMessage.data)
  //   }
  // }, [lastMessage])


  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col select-none">
      <div className="flex flex-col bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 p-1 rounded-xl">
        <div className="h-full w-full bg-gray-800 px-[5rem] py-[2rem] rounded-xl">
          <div className='text-[7rem] text-center font-semibold'>The{' '}
            <div className='bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 inline-block text-transparent bg-clip-text font-extrabold'>
              Quantum
            </div>
          </div>
          <div className='text-[7rem] text-center font-semibold'>Oregon Trail</div>

          <div className='flex flex-row justify-around mt-[4rem] mb-[2rem] mx-[1rem]'>
            <Link to="game" className="btn-primary bg-purple-700 hover:bg-purple-900">
              Create room
            </Link>
            <Link className="btn-primary bg-green-700 hover:bg-green-900" >
              Join a room
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}

