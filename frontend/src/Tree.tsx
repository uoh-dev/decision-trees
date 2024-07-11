import { useEffect, useState } from "react";
import Node from "./Node";

const drawCanvas = (id: string) => () => {
    const crCanvas = document.getElementById(id + "-canvas") as HTMLCanvasElement;
    const crNodes = document.getElementById(id + "-nodes");
    crCanvas.height = crNodes!.clientHeight;
    crCanvas.width = crNodes!.clientWidth;
    const ctx = crCanvas!.getContext("2d");
    console.log(ctx);
    ctx!.strokeStyle = "gray";
    const rows = crNodes!.children;
    for (let i = 0; i < rows.length - 1; i++) {
        const row = rows[i].children;
        const nextRow = rows[i + 1].children;
        for (const node of nextRow) {
            const parent = row[parseInt(node.getAttribute("data-parent")!)] as HTMLElement;
            ctx!.beginPath();
            ctx!.moveTo((node as HTMLElement).offsetLeft + 25, (node as HTMLElement).offsetTop + 25);
            ctx!.lineTo(parent.offsetLeft + 25, parent.offsetTop + 25);
            ctx!.stroke();
        }
    }
}

const enableDrag = (id: string) => () => {
    let mouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let startY = 0;
    let scrollTop = 0;
    const slider = document.getElementById(id + "-window");
    slider!.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (!mouseDown) return;
        slider!.scroll({
            left: scrollLeft - e.pageX + slider!.offsetLeft + startX,
            top: scrollTop - e.pageY + slider!.offsetTop + startY
        });
    });
    slider!.addEventListener("mousedown", (e) => {
        mouseDown = true;
        startX = e.pageX - slider!.offsetLeft;
        startY = e.pageY - slider!.offsetTop;
        scrollLeft = slider!.scrollLeft;
        scrollTop = slider!.scrollTop;
    });
    slider!.addEventListener("mouseup", () => {
        mouseDown = false;
    });
    slider!.addEventListener("mouseleave", () => {
        mouseDown = false;
    });
}

export type Leaf = { type: "leaf", diagnosis: string | null };
export type NodeType = { type: "tree", measurement: string, threshold: number, left: TreeType, right: TreeType };
export type TreeType = NodeType | Leaf;

function Tree(props: { id: string, mode: "edit" | "view", initialTree: TreeType, selected: TreeType | null, selector: (node: TreeType) => void }) {
    useEffect(drawCanvas(props.id));
    useEffect(enableDrag(props.id));
    const [tree, setTree] = useState(props.initialTree);
    const levels = [];
    let queue: ({ node: TreeType, parent: number })[] = [{ node: tree, parent: 0 }];
    while (queue.length > 0) {
        const last = Array.from(queue);
        levels.push(last);
        queue = [];
        last.forEach(({ node }, i) => {
            if (node.type === "leaf") return;
            if (node.left !== null) queue.push({ node: node.left, parent: i });
            if (node.right !== null) queue.push({ node: node.right, parent: i });
        });
    }
    return <>
        <div>Selected node: {props.selected !== null && props.selected.type === "tree" ? props.selected.measurement : "none"}</div>
        <div id={props.id + "-window"} className="tree-window">
            <canvas id={props.id + "-canvas"} className="tree-canvas" />
            <div id={props.id + "-nodes"} className="tree-nodes">
                {levels.map((lvl, k) => <div key={k} style={{ display: "flex", justifyContent: "center" }}>
                    {lvl.map(({ node, parent }, l) => <Node isSelected={node === props.selected} selector={() => props.selector(node)} key={l} node={node} parent={parent} updateState={() => setTree(tree)}></Node>)}
                </div>)}
            </div>
        </div>
    </>;
}

export default Tree
