import { useState } from 'react'
import './App.css'
import Browse from './Browse'
import Create from './Create'
import Evaluate from './Evaluate'

function App() {
  const [window, setWindow] = useState("browse");
  const [tree, setTree] = useState([{ measurement: "aabcabc", threshold: 3 }, { measurement: "babcabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, { measurement: "cabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, { measurement: "cabcabc", threshold: 3 }, null, null, null, null, null, null]);

  switch (window) {
      case "browse": return <Browse trees={[{name:"a",description:"a desc"},{name:"b",description:"b desc"}]} winState={setWindow} />
      case "create": return <Create winState={setWindow} tree={tree} />
      case "evaluate": return <Evaluate winState={setWindow} />
  }
}

export default App
