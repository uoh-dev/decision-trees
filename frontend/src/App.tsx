import { useEffect, useState } from 'react'
import './App.css'
import Browse from './Browse'
import Create from './Create'
import Evaluate from './Evaluate'
import Nav from "./Nav"
import { TreeType } from './Tree'

function App() {
    const [window, setWindow] = useState("browse");
    const [tree, setTree] = useState<{ c: number, tree: TreeType }>({ c: 0, tree: { type: "leaf", diagnosis: null }});
    const [evTreeId, setEvTreeId] = useState<string | null>(null);
    const [measurements, setMeasuremetss] = useState<string[]>([]);

    useEffect(() => { (async () => {
        const res = await fetch(`/measurements`);
        const measures = await res.json();
        setMeasuremetss(measures);
    })() }, []);

    switch (window) {
        case "browse": return <Browse winState={setWindow} setTree={setTree} setEvTreeId={setEvTreeId} />
        case "create": return <Create winState={setWindow} tree={tree} setTree={setTree} measurements={measurements} />
        case "evaluate": return <Evaluate winState={setWindow} treeId={evTreeId} />
        default: return <>
            <Nav winState={setWindow} selected="none"></Nav>
            no window selected
        </>;
    }
}

export default App
