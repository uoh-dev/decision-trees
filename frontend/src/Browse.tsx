import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Nav from './Nav'
import { GetTreeResponse, GetTreesResponse } from './APITypes';
import { TreeType } from './Tree';

function Browse(props: { winState: (window: string) => void, setTree: Dispatch<SetStateAction<{ c: number, tree: TreeType }>>, setEvTreeId: Dispatch<SetStateAction<string | null>> }) {
    const [trees, setTrees] = useState<{ id: string, name: string, description: string }[]>([]);
    const [nextLink, setNextLink] = useState<string | null>(null);

    useEffect(() => { (async () => {
        const res = await fetch(`/trees?limit=6`);
        const treesRes: GetTreesResponse = await res.json();
        setTrees(treesRes.data);
        setNextLink(treesRes.next);
    })() }, []);

    const supTrees = [];
    for (let i = 0; i < trees.length; i += 6) {
        supTrees.push(trees.slice(i, i + 6));
    }

    return <>
        <Nav winState={props.winState} selected="browse"></Nav>
        {supTrees.map((treeLevel) => <div style={{ display: "flex", float: "left" }}>
            {treeLevel.map(({ id, name, description }) => <div style={{ display: "flex", flexDirection: "column" }}>
                <div key={name} className="panel">
                    <h2 style={{ display: "inline" }}>{name.length > 0 ? name : <i>Unnamed</i>}</h2><br />
                    {description.length > 0 ? description : <i>No description</i>}
                </div>
                <button style={{ backgroundColor: "#333", width: 120, padding: "10px 15px 10px 15px", marginLeft: 20, marginTop: 5 }} onClick={async () => {
                    const res = await fetch(`/tree?id=${encodeURIComponent(id)}`);
                    const tree: GetTreeResponse = await res.json();
                    props.setTree({ c: 0, tree: tree.tree });
                    props.winState("create");
                }}>View</button>
                <button style={{ backgroundColor: "#333", width: 120, padding: "10px 15px 10px 15px", marginLeft: 20, marginTop: 5 }} onClick={() => {
                    props.setEvTreeId(id);
                    props.winState("evaluate");
                }}>Evaluate</button>
            </div>)}
        </div>)}
        {nextLink !== null ? <button style={{ backgroundColor: "#222"}} onClick={async () => {
            const res = await fetch(nextLink);
            const treesRes: GetTreesResponse = await res.json();
            setTrees(trees.concat(treesRes.data));
            setNextLink(treesRes.next);
        }}>More Trees</button> : <button disabled={true} style={{ backgroundColor: "#222"}}>More Trees</button>}
    </>
}

export default Browse
