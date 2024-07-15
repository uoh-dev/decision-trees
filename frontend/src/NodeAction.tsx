import { useRef, useState } from "react";
import { TreeType } from "./Tree";

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

function NodeAction(props: { node: TreeType, updateState: () => void, measurements: string[], initialLog: string[] }) {
    const measurementRef = useRef<HTMLSelectElement>(null);
    const thresholdRef = useRef<HTMLInputElement>(null);
    const diagnosisRef = useRef<HTMLInputElement>(null);
    const [log, setLog] = useState<string[]>(props.initialLog);
    // TODO: default values for measurement/threshold/diagnosis should
    // update when switching to another node, to actually show that
    // node's current values.
    return <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="node-action">
            <select ref={measurementRef} defaultValue={props.node.type === "tree" ? props.node.measurement : props.measurements[0]} className="node-action-elem" name="inpMeasurement" id="inpMeasurement">
                {props.measurements.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input ref={thresholdRef} className="node-action-elem" type="number" defaultValue={props.node.type === "tree" ? props.node.threshold : 0} />
            <button className="node-action-elem" onClick={() => { setMeasurement(props.node, props.updateState, measurementRef.current!.value, thresholdRef.current!.valueAsNumber); setLog(log.concat([`[NODE SET] ${measurementRef.current!.value} at ${thresholdRef.current!.value}`])); }}>Set Measurement</button>
            <button className="node-action-elem" disabled={props.node.type === "leaf" ? true : false} onClick={() => { removeNode(props.node!, props.updateState); setLog(log.concat([`[NODE REMOVED]`])); }}>Remove Node</button>
        </div>
        <div className="node-action">
            <input ref={diagnosisRef} className="node-action-elem" type="text" defaultValue={props.node.type === "leaf" && props.node.diagnosis !== null ? props.node.diagnosis : ""} />
            <button className="node-action-elem" disabled={props.node.type === "tree" ? true : false} onClick={() => { setDiagnosis(props.node, props.updateState, diagnosisRef.current!.value); setLog(log.concat([`[DIAGNOSIS SET] ${diagnosisRef.current!.value ?? "none"}`])); }}>Set Diagnosis</button>
            <button className="node-action-elem" disabled={props.node.type === "tree" || props.node.diagnosis === null ? true : false} onClick={() => { setDiagnosis(props.node, props.updateState, null); setLog(log.concat([`[DIAGNOSIS REMOVED]`])); }}>Remove Diagnosis</button>
        </div>
        <div className="node-action">
            <button className="node-action-elem" style={{ backgroundColor: "green" }}>Save</button>
        </div>
        <div className="node-action console">
            {log.map((entry, l) => <text key={l}>{entry}</text>)}
            <text>&gt;</text>
        </div>
    </div>
}

export default NodeAction
