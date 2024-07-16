import { useRef, useState } from "react";
import { TreeType } from "./Tree";
import { APPURL } from "./App";

function reverse<T>(inp: T[]) {
    return Array.from(inp).reverse();
}

function setMeasurement(node: TreeType, updateState: () => void, measurement: string, threshold: number) {
    if (node.type === "leaf") {
        const diagnosis = node.diagnosis;
        /* eslint-disable-next-line */
        const nNode = node as any;
        delete nNode.diagnosis;
        nNode.type = "tree";
        nNode.measurement = measurement;
        nNode.threshold = threshold;
        nNode.left = { type: "leaf", diagnosis };
        nNode.right = { type: "leaf", diagnosis };
    } else {
        node.measurement = measurement;
        node.threshold = threshold;
    }
    updateState();
}

function setDiagnosis(node: TreeType, updateState: () => void, diagnosis: string | null) {
    if (node.type !== "leaf") return;
    if (diagnosis !== null && diagnosis.length === 0) node.diagnosis = null;
    else node.diagnosis = diagnosis;
    updateState();
}

function removeNode(node: TreeType, updateState: () => void) {
    if (node.type !== "tree") return;
    /* eslint-disable-next-line */
    const nLeaf = node as any;
    delete nLeaf.measurement;
    delete nLeaf.threshold;
    delete nLeaf.left;
    delete nLeaf.right;
    nLeaf.type = "leaf";
    nLeaf.diagnosis = null;
    updateState();
}

async function save(tree: TreeType, updateState: () => void, name: string, description: string, log: string) {
    await fetch(`${APPURL}/tree`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            description,
            tree,
            log
        })
    });
}

function startOver(tree: TreeType, updateState: () => void) {
    /* eslint-disable-next-line */
    const nRoot = tree as any;
    if (nRoot.type === "tree") {
        delete nRoot.measurement;
        delete nRoot.threshold;
        delete nRoot.left;
        delete nRoot.right;
    }
    nRoot.type = "leaf";
    nRoot.diagnosis = null;
    updateState();
}

function NodeAction(props: { node: TreeType, tree: TreeType, updateState: () => void, measurements: string[], initialLog: string[] }) {
    const measurementRef = useRef<HTMLSelectElement>(null);
    const thresholdRef = useRef<HTMLInputElement>(null);
    const diagnosisRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLInputElement>(null);
    const [log, setLog] = useState<string[]>(props.initialLog);
    // TODO: default values for measurement/threshold/diagnosis should
    // update when switching to another node, to actually show that
    // node's current values.
    return <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="node-action">
            <label htmlFor="inpMeasurement">Measurement Name</label>
            <select ref={measurementRef} defaultValue={props.node.type === "tree" ? props.node.measurement : props.measurements[0]} className="node-action-elem" name="inpMeasurement" id="inpMeasurement">
                {props.measurements.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <label htmlFor="inpThreshold">Threshold</label>
            <input ref={thresholdRef} className="node-action-elem" type="number" defaultValue={props.node.type === "tree" ? props.node.threshold : 0} />
            <button className="node-action-elem" onClick={() => { setMeasurement(props.node, props.updateState, measurementRef.current!.value, thresholdRef.current!.valueAsNumber); setLog(log.concat([`[NODE SET] ${measurementRef.current!.value} at ${thresholdRef.current!.value}`])); }}>Set Measurement</button>
            <button className="node-action-elem" disabled={props.node.type === "leaf" ? true : false} onClick={() => { removeNode(props.node!, props.updateState); setLog(log.concat([`[NODE REMOVED]`])); }}>Remove Node</button>
        </div>
        <div className="node-action">
            <label htmlFor="inpDiagnosis">Diagnosis</label>
            <input ref={diagnosisRef} className="node-action-elem" type="text" defaultValue={props.node.type === "leaf" && props.node.diagnosis !== null ? props.node.diagnosis : ""} />
            <button className="node-action-elem" disabled={props.node.type === "tree" ? true : false} onClick={() => { setDiagnosis(props.node, props.updateState, diagnosisRef.current!.value); setLog(log.concat([`[DIAGNOSIS SET] ${diagnosisRef.current!.value ?? "none"}`])); }}>Set Diagnosis</button>
            <button className="node-action-elem" disabled={props.node.type === "tree" || props.node.diagnosis === null ? true : false} onClick={() => { setDiagnosis(props.node, props.updateState, null); setLog(log.concat([`[DIAGNOSIS REMOVED]`])); }}>Remove Diagnosis</button>
        </div>
        <div className="node-action">
            <label htmlFor="name">Name</label>
            <input ref={nameRef} type="text" className="node-action-elem" />
            <label htmlFor="desc">Description</label>
            <input ref={descRef} type="text" className="node-action-elem" />
            <button className="node-action-elem" style={{ backgroundColor: "green" }} onClick={() => save(props.tree, props.updateState, nameRef.current!.value, descRef.current!.value, log.join("\n"))}>Save</button>
            <button className="node-action-elem" style={{ backgroundColor: "#850e05" }} onClick={() => { startOver(props.tree, props.updateState); setLog([]); }}>Start Over</button>
        </div>
        <div className="node-action console">
            <div>&gt;</div>
            {reverse(log).map((entry, l) => <div key={l}>{entry}</div>)}
        </div>
    </div>
}

export default NodeAction
