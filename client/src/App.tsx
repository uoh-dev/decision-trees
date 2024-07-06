import { useState } from 'react'
import './App.css'
import Browse from './Browse'
import Create from './Create'
import Evaluate from './Evaluate'

function App() {
  const [state, setState] = useState({ window: "browse" })

  switch (state.window) {
      case "browse": return <Browse appState={setState} />
      case "create": return <Create appState={setState} />
      case "evaluate": return <Evaluate appState={setState} />
  }
}

export default App
