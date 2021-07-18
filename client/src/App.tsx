import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import io from 'socket.io-client'
import ReactDOM from 'react-dom';

const YTPlayer = require('yt-player')
// const teste = document.getElementById('player')
// const player = new YTPlayer('.player')
const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Socket Conectado com sucesso')
})

function App() {
  const [message, updateMessage] = useState('')
  const [messages, updateMessages] = useState([])
  let videoURL = ''
  let videoList:any = []

  // Recebe mensagem para iniciar/pausar video
  socket.on('receivePlayOrPause', (data: any) => {
    console.log('Recebendo mensagem para pausar video', data)
  })

  socket.on('receiveAddVideo', (data: any) => {
    console.log('Recebendo mensagem para adicionar um video', data)
    // player.load('GKSRyLdjsPA')
    // player.setVolume(100)
    
    // player.on('playing', () => {
    //   console.log(player.getDuration()) // => 351.521
    // })
    console.log('AGORA VAI ', videoList)
    formatterVideoList()
  })

  const formatterVideoList = () => {
    ReactDOM.render(
      <li>{videoList}</li>,  document.getElementById('videoList')
    );
  }

  const addVideo = (event: any) => {
    console.log('Adicionar um video')
    //Para evitar que o navegador atualize sempre q fizer a requisição
    event.preventDefault();
    socket.emit('addVideo',{
      id: '1',
      nome: videoURL
    })
    videoList.push(videoURL)
  }

  const handleChange = (event: any) => {
    videoURL = event.target.value;
  }

  const playOrPause = (event: any) => {
    console.log('Click BroadCast')
    //Para evitar que o navegador atualize sempre q fizer a requisição
    event.preventDefault();
    socket.emit('playOrPause', {
      id: '2',
      nome: 'Blinking the p...'
    })
  }

  // player inicio
  // player.load('GKSRyLdjsPA')
  // player.setVolume(100)
   
  // player.on('playing', () => {
  //   console.log(player.getDuration()) // => 351.521
  // })
  // player fim

  return (
    <div className="App">
      <form onSubmit={addVideo}>
        <label>
          URL Video:
          <input type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="Adicionar" />
      </form>
      <button onClick={playOrPause}>
        Iniciar/Pausar
      </button>
      {/* 1. The <iframe> (and video player) will replace this */}
      <script src='https://www.youtube.com/iframe_api' async></script>
      <div id="player" className="player">PLAYER YOUTUBE</div>
      <ul id ='videoList'></ul>
      
    </div>
  )
}

export default App
