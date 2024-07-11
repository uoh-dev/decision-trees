import { useState } from 'react'
import './App.css'
import Browse from './Browse'
import Create from './Create'
import Evaluate from './Evaluate'
import Nav from "./Nav"
import { TreeType } from './Tree'

function App() {
  const [window, setWindow] = useState("browse");
  const [tree, setTree] = useState<TreeType>({ type: "tree", measurement: "aabcabc", threshold: 3, left: { type: "tree", measurement: "babcabc", threshold: 3, left: { type: "tree", measurement: "aabcabc", threshold: 3, left: { type: "tree", measurement: "aabcabc", threshold: 3, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } }, right: { type: "tree", measurement: "aabcabc", threshold: 3, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } } }, right: { type: "tree", measurement: "aabcabc", threshold: 3, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } } }, right: { type: "tree", measurement: "cabcabc", threshold: 3, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } }});

  switch (window) {
      case "browse": return <Browse trees={[{name:"a",description:"a desc"},{name:"b",description:"b desc"}]} winState={setWindow} />
      case "create": return <Create winState={setWindow} tree={tree} />
      case "evaluate": return <Evaluate winState={setWindow} />
      default: return <>
          <Nav winState={setWindow} selected="none"></Nav>
          no window selected
      </>;
  }
}

export default App
