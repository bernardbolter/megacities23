import { ReactNode } from "react";

export interface City {
    name: string;
    englishName?: string;
    slug: string;
    lat: number | string;
    lng: number | string;
    population: string;
    video: string;
    artist: string;
    title: string;
}

export interface Spot {
    name: string;
    slug: string;
    city: string;
    state: string;
    video: string;
    skaters: string;
    title: string;
}

export interface Megacity {
    name: string;
    englishName?: string;
    slug: string;
    country: string;
    flag: string;
    type: string;
    year: string;
    completed: boolean;
    cities?: City[];
    spots?: Spot[];
}

export interface Greeting {
    greeting: string;
    language: string;
}

export interface MegaState {
    megacities: Megacity[];
    shuffledMegacities: Megacity[];
    greetings: Greeting[];
    url: string;
    megaIndexSlug: string;
    navOpen: boolean;
}

export type MegaContextType = {
    mega: MegaState;
    setMega: React.Dispatch<React.SetStateAction<MegaState>>;
    shuffleMegacities: (megacities: Megacity[]) => void;
}

export interface MegaProviderProps {
    children: ReactNode;
}

export interface IndexHeader {
    name: string;
    englishName: string;
    flag: string;
}