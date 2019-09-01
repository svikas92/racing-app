export type PosMessage = {
    x: number,
    y: number
}

export type LapMessageI = {
    m: number;
    c: number;
}

export interface PosI {
    x: number;
    y: number;
    actualTime: number;
    expectedTime?: number;
    racer: RacerI
}

export interface RacerI {
    id: number;
    // port: number;
    lastPosition?: PosMessage;
}

export interface LapI {
    id: number;
    message: LapMessageI[];
    start: number;
    notifications: Map<number, PosI[]>
    end?: number;
}

export interface MasterI {
    racers: Map<number, RacerI>;
    laps: Map<number, LapI>;
}