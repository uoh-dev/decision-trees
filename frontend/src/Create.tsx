import { useEffect } from 'react';
import Nav from './Nav'

function drawCanvas() {
    const crCanvas = document.getElementById("creation-canvas") as HTMLCanvasElement;
    const crWindow = document.getElementById("creation-window");
    crCanvas.width = crWindow!.clientWidth;
    crCanvas.height = crWindow!.clientHeight;
    const ctx = crCanvas!.getContext("2d");
    ctx!.strokeStyle = "gray";
    const rows = crWindow!.children;
    for (let i = 0; i < rows.length - 1; i++) {
        const row = rows[i].children;
        const nextRow = rows[i + 1].children;
        for (let k = 0; k < row.length; k++) {
            const elem = row[k] as HTMLElement;
            console.log(elem);
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

function Create(props: { winState: (window: string) => void, tree: ({ measurement: string, threshold: number } | null)[] }) {
    useEffect(drawCanvas);
    const levels = [];
    for (let i = 1; i < props.tree.length; i *= 2) {
        levels.push(props.tree.slice(i - 1, i * 2 - 1))
    }
    return <>
        <Nav winState={props.winState} selected="create"></Nav>
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <canvas id="creation-canvas"></canvas>
            <div id="creation-window">
                {levels.map((lvl) => <div style={{ display: "flex", justifyContent: "center" }}>
                    {lvl.map((node) => node === null ? <div className="node" style={{ visibility: "hidden" }} /> : <div className="node" title={"Threshold: " + node.threshold.toString()} style={{ textAlign: "center", lineHeight: "3" }}>{node.measurement}</div>)}
                </div>)}
            </div>
        </div>
    </>
}

export default Create
