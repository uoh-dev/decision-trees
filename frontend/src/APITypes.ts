import { TreeType } from "./Tree";

export type GetMeasurementsResponse = string[];
export type GetAthletesResponse = {
    data: {
        name: string,
        measurements: {
            descriptor: string,
            value: number
        }[]
    }[],
    next: string | null
};
export type GetTreeResponse = {
    name: string,
    description: string,
    tree: TreeType,
    log: string
};
export type GetTreesResponse = {
    data: {
        id: string,
        name: string,
        description: string,
        amount_nodes: number
    }[],
    next: string | null
};
export type PostSuggestionResponse = {
    measurement: string,
    threshold: number
};
