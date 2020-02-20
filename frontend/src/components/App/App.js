import React from 'react'
import './App.scss'

import Sidebar from '../Sidebar/Sidebar'
import Main from '../Main/Main'


const App = () => {
  return (
    <div className="App">
      <div className="header">
        <p>Rechnungs-Editor</p>
      </div>
      <Sidebar />
      <Main />
    </div>
  )
}

export default App;
