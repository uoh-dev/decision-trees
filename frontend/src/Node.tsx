import { useState } from "react";
import { TreeType } from "./Tree";

function Node(props: { node: TreeType, parent: number, updateState: () => void, selector: () => void, isSelected: boolean }) {
    function removeLeft() {
        if (props.node.type !== "tree") return;
        props.node.left = { type: "leaf", diagnosis: null };
        props.updateState();
    }

    function removeRight() {
        if (props.node.type !== "tree") return;
        props.node.right = { type: "leaf", diagnosis: null };
        props.updateState();
    }

    function addLeft(measurement: string, threshold: number) {
        if (props.node.type !== "tree") return;
        props.node.left = { type: "tree", measurement, threshold, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } };
        props.updateState();
    }

    function addRight(measurement: string, threshold: number) {
        if (props.node.type !== "tree") return;
        props.node.right = { type: "tree", measurement, threshold, left: { type: "leaf", diagnosis: null }, right: { type: "leaf", diagnosis: null } };
        props.updateState();
    }

    if (props.node.type === "leaf")
        return <div onClick={props.selector} data-parent={props.parent} className={props.isSelected ? "node node-selected" : "node"} style={{ textAlign: "center", lineHeight: "3" }}>{props.node.diagnosis}</div>
    return <div onClick={props.selector} data-parent={props.parent} className={props.isSelected ? "node node-selected" : "node"} title={"Threshold: " + props.node.threshold.toString()} style={{ textAlign: "center", lineHeight: "3" }}></div>
}

export default Node
