import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Item_master from './pages/master/Item_master'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Item_master />
      </main>
    </div>
  )
}

export default App
