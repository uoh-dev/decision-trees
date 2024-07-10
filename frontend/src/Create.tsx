import Nav from './Nav'
import Tree, { TreeType } from './Tree'

function Create(props: { winState: (window: string) => void, tree: TreeType }) {
    return <>
        <Nav winState={props.winState} selected="create"></Nav>
        <Tree mode="edit" id="create" tree={props.tree} />
    </>
}

export default Create
