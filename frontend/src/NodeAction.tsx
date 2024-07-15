import { useEffect, useState } from "react";
import { Leaf, NodeType, TreeType } from "./Tree";

function setMeasurement(node: TreeType, updateState: () => void, measurement: string, threshold: number) {
    if (node.type === "leaf") {
        const diagnosis = node.diagnosis;
        delete (node as any).diagnosis;
        (node as any).type = "tree";
        const nNode = node as unknown as NodeType;
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

function deleteNode(node: TreeType, updateState: () => void) {
    if (node.type !== "tree") return;
    delete (node as any).measurement;
    delete (node as any).threshold;
    delete (node as any).left;
    delete (node as any).right;
    (node as any).type = "leaf";
    const nLeaf = node as unknown as Leaf;
    nLeaf.type = "leaf";
    nLeaf.diagnosis = null;
    updateState();
}

function NodeAction(props: { node: TreeType, updateState: () => void, measurements: string[], initialLog: string[] }) {
    const [measurement, setMeasurementState] = useState(props.node.type === "tree" ? props.node.measurement : (props.measurements[0] ?? "abc"));
    const [threshold, setThresholdState] = useState(props.node.type === "tree" ? props.node.threshold : 0.5);
    const [diagnosis, setDiagnosisState] = useState(props.node.type === "leaf" ? props.node.diagnosis : null);
    const [log, setLog] = useState<string[]>(props.initialLog);
    useEffect(() => {
        console.log(measurement);
        console.log(props.node);
    });
    // TODO: default values for measurement/threshold/diagnosis should
    // update when switching to another node, to actually show that
    // node's current values.
    return <div style={{ display: "flex" }}>
        <div className="node-action">
            <button className="node-action-elem" onClick={() => setMeasurement(props.node, props.updateState, measurement, threshold)}>Set Measurement</button>
            <select onChange={(e) => setMeasurementState(e.target.value)} value={measurement} className="node-action-elem" name="inpMeasurement" id="inpMeasurement">
                {props.measurements.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input onChange={(e) => setThresholdState(parseFloat(e.target.value))} className="node-action-elem" type="number" value={threshold} />
        </div>
        <div className="node-action">
            <button className="node-action-elem" disabled={props.node.type === "tree" ? true : false} onClick={() => setDiagnosis(props.node, props.updateState, diagnosis)}>Set Diagnosis</button>
            <input onChange={(e) => setDiagnosisState(e.target.value)} className="node-action-elem" type="text" value={diagnosis !== null ? diagnosis : ""} />
        </div>
        <div className="node-action">
            <button className="node-action-elem" onClick={() => deleteNode(props.node!, props.updateState)}>Delete Node</button>
        </div>
    </div>
}

export default NodeAction
