import { useState, useEffect } from 'react';
import { GetEvaluationResponse } from './APITypes';
import Nav from './Nav'

function Evaluate(props: { winState: (window: string) => void, treeId: string | null }) {
    const [ev, setEval] = useState<GetEvaluationResponse | null>(null);

    useEffect(() => { (async () => {
        if (props.treeId === null) return;
        const res = await fetch(`/evaluation?id=${encodeURIComponent(props.treeId)}`);
        const treesRes: GetEvaluationResponse = await res.json();
        setEval(treesRes);
    })() }, []);

    if (ev === null) return <Nav winState={props.winState} selected="evaluate"></Nav>;

    return <>
        <Nav winState={props.winState} selected="evaluate"></Nav>
        <table style={{ maxWidth: 300 }}>
            <tr>
                <th>Athlete Name</th>
                <th>Diagnosis</th>
            </tr>
            {ev.map(({ name, diagnosis }, l) => <tr key={l}>
                <th>{name}</th>
                <th>{diagnosis ?? "None"}</th>
            </tr>)}
        </table>
    </>;
}

export default Evaluate
