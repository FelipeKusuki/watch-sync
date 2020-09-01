import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import io from 'socket.io-client'

const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Socket Conectado com sucesso')
})

function App() {
  const [message, updateMessage] = useState('')
  const [messages, updateMessages] = useState([])

  socket.on('messageBroadcast', (data: any) => {
    console.log('Recebendo mensagem Broadcast', data)
  })

  const onClick = () => {
    console.log('Click Unico')
    socket.emit('onClick',{
      id: '1',
      nome: 'Sergio Malandro'
    })
  }

  const clickBroadCast = () => {
    console.log('Click BroadCast')
    socket.emit('onClickBroadcast', {
      id: '2',
      nome: 'Blinking the p...'
    })
  }

  return (
    <div className="App">
      <button onClick={onClick}>
        SEM broadcast
      </button>
      <button onClick={clickBroadCast}>
        COM broadcast
      </button>
    </div>
  )
}

export default App
