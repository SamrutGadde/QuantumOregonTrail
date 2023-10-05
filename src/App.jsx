import { useEffect, useState } from 'react'
import './App.css'
import useWebSocket from 'react-use-websocket'

const socketUrl = 'ws://localhost:8080/'

function App() {
  const [message, setMessage] = useState("No Message")
  const [input, setInput] = useState("")

  const { 
    sendMessage,
    lastMessage,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    shouldReconnect: () => true,
  })

  const handleClick = (e) => {
    sendMessage(input)
    console.log(input)
  }

  useEffect(() => {
    if (lastMessage) {
      setMessage(lastMessage.data)
    }
  }, [lastMessage])


  return (
      <div>
        <div className='text-3xl font-bold underline'>Title</div>
        <div className='flex flex-col mt-2 bg-red-500 '>
          <div className="border-4 border-sky-500 rounded-full p-3">
            Create a new room
          </div>
          <div className='border-4 border-sky-500 rounded-full p-3'>
            Join a room
          </div>
        </div>
      {/* <h1 className="text-3xl font-bold underline flex flex-col">
        {message}
      </h1>
      <input type="text" onChange={e => setInput(e.target.value)}/>

      <button onClick={handleClick}>Send</button> */}
    </div>
  )

}

export default App
