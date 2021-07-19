import React, { useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import ReactPlayer from 'react-player'

const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Socket Conectado com sucesso')
})

function App() {
  const [videoList, setVideoList] = useState(['https://www.youtube.com/watch?v=ERFXravD0AU'])
  const [videoURL, setUrl] = useState('')

  // Recebe mensagem para iniciar/pausar video
  socket.on('receivePlayOrPause', (data: any) => {
    console.log('Recebendo mensagem para pausar video', data)
  })

  socket.on('receiveAddVideo', (data: any) => {
  })


  const addVideo = (event: any) => {
    //Para evitar que o navegador atualize sempre q fizer a requisição
    event.preventDefault();
    socket.emit('addVideo',{
      id: '1',
      nome: videoURL
    })
    setVideoList([
      ...videoList,
      videoURL
    ])
  }

  const handleEndVideo = () => {
    if(videoList.length > 1) {
      // Remove o primeiro elemento da lista
      videoList.splice(0,1);
      setVideoList(
        [...videoList]
      )
    }
    setUrl(videoList[0])
    console.log('AGORA VAI', videoList)
  }

  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value)
  }

  return (
    <div className="App">
      <form onSubmit={addVideo}>
        <label>
          URL Video:
          <input type="text" onChange={handleChangeUrl} />
        </label>
        <input type="submit" value="Adicionar" />
      </form>
      <button onClick={handleEndVideo}>
        Proximo
      </button>
      <div className="player">
        <ReactPlayer playing controls={true} url={videoList[0]} onEnded={handleEndVideo} />
      </div>
      <ul id ='videoList'>
        {videoList.map(item => 
          <li>{item}</li>
        )}
      </ul>
      
    </div>
  )
}

export default App
