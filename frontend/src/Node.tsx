import { TreeType } from "./Tree";

function Node(props: { node: TreeType, parent: number, updateState: () => void, selector: () => void, isSelected: boolean }) {
    if (props.node.type === "leaf")
        return <div onClick={props.selector} data-parent={props.parent} className={props.isSelected ? "node node-selected" : "node"} style={{ textAlign: "center", lineHeight: "3" }}>{props.node.diagnosis}</div>
    return <div onClick={props.selector} data-parent={props.parent} className={props.isSelected ? "node node-selected" : "node"} title={"Threshold: " + props.node.threshold.toString()} style={{ textAlign: "center", lineHeight: "3" }}></div>
}

export default Node
