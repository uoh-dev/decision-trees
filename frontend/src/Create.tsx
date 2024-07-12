import { useState } from 'react'
import Nav from './Nav'
import Tree, { TreeType } from './Tree'

function Create(props: { winState: (window: string) => void, tree: TreeType, measurements: string[] }) {
    const [selected, selector] = useState<TreeType>(props.tree);

    return <>
        <Nav winState={props.winState} selected="create" />
        <Tree mode="edit" id="create" initialTree={props.tree} selected={selected} selector={selector} measurements={props.measurements} />
    </>
}

export default Create
