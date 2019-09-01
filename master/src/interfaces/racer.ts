export type PointI = {
    x: number,
    y: number
}

export type BodyData = {
    lapId: number;
    point: PointI;
}

export type LapMessageI = {
    m: number;
    c: number;
}

export interface PosI {
    count: number;
    diff: number;
}

export interface RacerI {
    id: number;
    port: number;
    lastPosition?: PointI;
}

export interface LapI {
    id: number;
    message: LapMessageI[];
    start: number;
    notifications: Map<number, PosI>
    end?: number;
}

export interface MasterI {
    racers: Map<number, RacerI>;
    laps: Map<number, LapI>;
}