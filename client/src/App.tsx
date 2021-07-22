import React, { useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import ReactPlayer from 'react-player'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log('Socket Conectado com sucesso')
})

function App() {
  const [videoList, setVideoList] = useState(['https://www.youtube.com/watch?v=ERFXravD0AU'])
  const [videoURL, setUrl] = useState('')
  const [playVideo, setPlayVideo] = useState(false)

  // Recebe mensagem para iniciar/pausar video
  socket.on('receivePlayOrPause', (data: any) => {
    console.log('DASTA', data)
    if(data == 'play') {
      setPlayVideo(true)
    } else {
      setPlayVideo(false)
    }

  })

  socket.on('receiveAddVideo', (data: any) => {
    if(data.url) {
      addVideo(data.url)
    }
  })

  socket.on('receiveEndVideo', () => {
    endVideo()
  })

  const handlePlayVideo = () => {
    socket.emit('playOrPause', 'play')
  }

  const handlePauseVideo = () => {
    socket.emit('playOrPause', 'pause')
  }

  const handleAddVideo = (event: any) => {
    //Para evitar que o navegador atualize sempre q fizer a requisição
    event.preventDefault();
    socket.emit('addVideo',{
      id: '1',
      url: videoURL
    })
  }

  const handleEndVideo = () => {
    socket.emit('endVideo', 'pause')
  }

  const addVideo = (url: string) => {
    setVideoList([
      ...videoList,
      url
    ])
  }

  const endVideo = () => {
    if(videoList.length > 1) {
      // Remove o primeiro elemento da lista
      videoList.splice(0,1);
      setVideoList(
        [...videoList]
      )
    }
    setUrl(videoList[0])
  }

  const handleChangeUrl = (event: any) => {
    setUrl(event.target.value)
  }

  return (
    <div className="App">

      <div className="header">
        <div className="logo">
        {/* logo */}
        </div>
        <h2>
          Daniel Do Sync
        </h2>
      </div>

      <div className="body">
        <div className="userList">
          <h2>
            Lista de usuarios
          </h2>
          <ul>
            {videoList.map(item => 
              <li>{item}</li>
            )}
          </ul>
        </div>

        <div className="youtubePlayer">
          <div className="player">
            <ReactPlayer playing={playVideo} controls={true} url={videoList[0]} onPlay={handlePlayVideo} onPause={handlePauseVideo} onEnded={handleEndVideo} />
          </div>
          <div className="controls">
            <form onSubmit={handleAddVideo}>
              <TextField id="standard-basic" label="URL Video:" onChange={handleChangeUrl} />
              <Button variant="contained" color="primary" onClick={handleAddVideo} style={{height: "100%"}}>
                Adicionar
              </Button>
            </form>
            <Button variant="contained" color="primary" onClick={handleEndVideo}>
              Proximo
            </Button>
          </div>
        </div>

        <div className="videoList">
          <h2>
            Lista de Videos
          </h2>
          <ul>
            {videoList.map(item => 
              <li>{item}</li>
            )}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default App
