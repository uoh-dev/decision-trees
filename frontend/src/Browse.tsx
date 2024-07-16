import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Nav from './Nav'
import { GetTreeResponse, GetTreesResponse } from './APITypes';
import { TreeType } from './Tree';

function Browse(props: { winState: (window: string) => void, setTree: Dispatch<SetStateAction<{ c: number, tree: TreeType }>> }) {
    const [trees, setTrees] = useState<{ id: string, name: string, description: string }[]>([]);

    useEffect(() => { (async () => {
        const res = await fetch(`/trees`);
        const treesRes: GetTreesResponse = await res.json();
        setTrees(trees.concat(treesRes.data));
    })() });

    return <>
        <Nav winState={props.winState} selected="browse"></Nav>
        <div style={{ display: "flex", float: "left" }}>
            {trees.map(({ id, name, description }) => <div key={name} className="panel" onClick={async () => {
                const res = await fetch(`/tree?id=${encodeURIComponent(id)}`);
                const tree: GetTreeResponse = await res.json();
                props.setTree({ c: 0, tree: tree.tree });
                props.winState("create");
            }}>
                <h2 style={{ display: "inline" }}>{name}</h2><br />
                <span style={{ fontStyle: "italic" }}>{description}</span>
                <button>View</button>
                <button>Evaluate</button>
            </div>)}
        </div>
    </>
}

export default Browse
