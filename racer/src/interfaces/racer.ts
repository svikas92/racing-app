export interface RacerI {
    id: number;
    laps: Map<number, LapI>;
    x?: number;
    y?: number;
    line?: LineI;
}

export interface LineI {
    m: number;
    c: number;
    // racer: RacerI;
}

export interface LapI {
    id: number;
    message: LapMessageI[];
}

export type LapMessageI = {
    m: number;
    c: number;
}

export type PointI = {
    x: number;
    y: number;
}