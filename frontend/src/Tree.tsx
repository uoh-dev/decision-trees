import { useEffect } from "react";

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

export type TreeType = { measurement: string, threshold: number, left: TreeType | null, right: TreeType | null };

function Tree(props: { id: string, mode: "edit" | "view", tree: TreeType }) {
    useEffect(drawCanvas(props.id));
    useEffect(enableDrag(props.id));
    const levels = [];
    let queue: (TreeType & { parent: number })[] = [Object.assign(props.tree, { parent: 0 })];
    while (queue.length > 0) {
        const last = Array.from(queue);
        levels.push(last);
        queue = [];
        last.forEach((node, i) => {
            if (node.left !== null) queue.push(Object.assign(node.left, { parent: i }));
            if (node.right !== null) queue.push(Object.assign(node.right, { parent: i }));
        });
    }
    return <div id={props.id + "-window"} className="tree-window">
        <canvas id={props.id + "-canvas"} className="tree-canvas" />
        <div id={props.id + "-nodes"} className="tree-nodes">
            {levels.map((lvl, k) => <div key={k} style={{ display: "flex", justifyContent: "center" }}>
                {lvl.map((node, l) => <div key={l} data-parent={node.parent} className="node" title={"Threshold: " + node.threshold.toString()} style={{ textAlign: "center", lineHeight: "3" }}>{node.measurement}</div>)}
            </div>)}
        </div>
    </div>;
}

export default Tree
