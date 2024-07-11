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

function setDiagnosis(node: TreeType, updateState: () => void, diagnosis: string) {
    if (node.type !== "leaf") return;
    node.diagnosis = diagnosis;
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

function NodeAction(props: { node: TreeType | null }) {
    if (props.node === null) return;
    
}
