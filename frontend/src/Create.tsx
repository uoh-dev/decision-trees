import { useEffect } from 'react';
import Nav from './Nav'

function drawCanvas() {
    const crCanvas = document.getElementById("creation-canvas") as HTMLCanvasElement;
    const crNodes = document.getElementById("creation-nodes");
    crCanvas.height = crNodes!.clientHeight;
    crCanvas.width = crNodes!.clientWidth;
    const ctx = crCanvas!.getContext("2d");
    console.log(ctx);
    ctx!.strokeStyle = "gray";
    const rows = crNodes!.children;
    for (let i = 0; i < rows.length - 1; i++) {
        
        const row = rows[i].children;
        const nextRow = rows[i + 1].children;
        for (let k = 0; k < row.length; k++) {
            const elem = row[k] as HTMLElement;
            const child0 = nextRow[2 * k] as HTMLElement;
            const child1 = nextRow[2 * k + 1] as HTMLElement;
            if (child0.style.visibility !== "hidden") {
                ctx!.beginPath();
                ctx!.moveTo(elem.offsetLeft + 25, elem.offsetTop + 25);
                ctx!.lineTo(child0.offsetLeft + 25, child0.offsetTop + 25);
                ctx!.stroke();
            }
            if (child1.style.visibility !== "hidden") {
                ctx!.beginPath();
                ctx!.moveTo(elem.offsetLeft + 25, elem.offsetTop + 25);
                ctx!.lineTo(child1.offsetLeft + 25, child1.offsetTop + 25);
                ctx!.stroke();
            }
        }
    }
}

function enableDrag() {
    let mouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let startY = 0;
    let scrollTop = 0;
    const slider = document.getElementById("creation-window");
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

function Create(props: { winState: (window: string) => void, tree: ({ measurement: string, threshold: number } | null)[] }) {
    useEffect(drawCanvas);
    useEffect(enableDrag);
    const levels = [];
    for (let i = 1; i < props.tree.length; i *= 2) {
        levels.push(props.tree.slice(i - 1, i * 2 - 1))
    }
    return <>
        <Nav winState={props.winState} selected="create"></Nav>
        <div id="creation-window">
            <canvas id="creation-canvas" />
            <div id="creation-nodes">
                {levels.map((lvl, k) => <div key={k} style={{ display: "flex", justifyContent: "center" }}>
                    {lvl.map((node, l) => node === null ? <div key={l} className="node" style={{ visibility: "hidden" }} /> : <div key={l} className="node" title={"Threshold: " + node.threshold.toString()} style={{ textAlign: "center", lineHeight: "3" }}>{node.measurement}</div>)}
                </div>)}
            </div>
        </div>
    </>
}

export default Create
