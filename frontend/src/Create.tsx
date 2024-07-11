import { useState } from 'react'
import Nav from './Nav'
import Tree, { TreeType } from './Tree'

function Create(props: { winState: (window: string) => void, tree: TreeType }) {
    const [selected, selector] = useState<TreeType | null>(null);

    return <>
        <Nav winState={props.winState} selected="create"></Nav>
        <Tree mode="edit" id="create" initialTree={props.tree} selected={selected} selector={selector} />
    </>
}

export default Create
