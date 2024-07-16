import { Dispatch, SetStateAction, useState } from 'react';
import Nav from './Nav'
import { APPURL } from './App';
import { GetTreeResponse, GetTreesResponse } from './APITypes';
import { TreeType } from './Tree';

function Browse(props: { winState: (window: string) => void, setTree: Dispatch<SetStateAction<{ c: number, tree: TreeType }>> }) {
    const [trees, setTrees] = useState<{ id: string, name: string, description: string, amount_nodes: number }[]>([]);

    // useEffect was suggested here in a guide.. why?
    (async () => {
        const res = await fetch(`${APPURL}/trees`);
        const treesRes: GetTreesResponse = await res.json();
        setTrees(trees.concat(treesRes.data));
    })();

    return <>
        <Nav winState={props.winState} selected="browse"></Nav>
        <div style={{ display: "flex", float: "left" }}>
            {trees.map(({ id, name, description }) => <div key={name} className="panel" onClick={async () => {
                const res = await fetch(`${APPURL}/tree?id=${encodeURIComponent(id)}`);
                const tree: GetTreeResponse = await res.json();
                props.setTree({ c: 0, tree: tree.tree });
                props.winState("create");
            }}>
                <h2 style={{ display: "inline" }}>{name}</h2><br />
                <span style={{ fontStyle: "italic" }}>{description}</span>
            </div>)}
        </div>
    </>
}

export default Browse
