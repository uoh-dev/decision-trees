import { Dispatch, SetStateAction, useState } from 'react'
import Nav from './Nav'
import Tree, { TreeType } from './Tree'

function Create(props: { winState: (window: string) => void, tree: { c: number, tree: TreeType}, setTree: Dispatch<SetStateAction<{ c: number, tree: TreeType }>>, measurements: string[] }) {
    const [selected, selector] = useState<TreeType>(props.tree.tree);

    return <>
        <Nav winState={props.winState} selected="create" />
        <Tree mode="edit" id="create" initialTree={props.tree} setTree={props.setTree} selected={selected} selector={selector} measurements={props.measurements} />
    </>
}

export default Create
