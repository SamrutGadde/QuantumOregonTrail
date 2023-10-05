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
    <div className="w-100 h-100">
      <h1 className="text-3xl font-bold underline flex flex-col">
        {message}
      </h1>
      <input type="text" onChange={e => setInput(e.target.value)}/>

      <button onClick={handleClick}>Send</button>
    </div>
  )

}

export default App
