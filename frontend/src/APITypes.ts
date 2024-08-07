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
        description: string
    }[],
    next: string | null
};
export type PostSuggestionResponse = {
    measurement: string,
    threshold: number
};
export type GetEvaluationResponse = {
    name: string,
    diagnosis: string | null
}[];
