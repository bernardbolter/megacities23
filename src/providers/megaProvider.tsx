import React, { useState, useEffect, createContext } from "react";
import { shuffle } from "../helpers";
import {
  MegaProviderProps,
  MegaState,
  MegaContextType, 
  Megacity, 
  City,
  Greeting
} from "@/types/megacities";

import megacitiesData from '../data/megacities/megacities.json'
import greetingsData from '../data/greetings/greetings.json'

export const MegaContext = createContext<MegaContextType | null>(null);

const MegaProvider: React.FC<MegaProviderProps> = ({ children }) => {

  const [mega, setMega] = useState<MegaState>({
    megacities: [],
    shuffledMegacities: [],
    greetings: [],
    url: "https://thefilterman.de/artwork/megacities/",
    megaIndexSlug: "",
    navOpen: false,
  });

  useEffect(() => {
    const rawMegacities: Megacity[] = []
    megacitiesData.map(megacity => {
      return rawMegacities.push(megacity)
    });
    const rawGreetings: Greeting[] = []
    greetingsData.map(greet => {
      return rawGreetings.push(greet)
    })

    setMega(state => ({ 
        ...state,
        megacities: rawMegacities,
        shuffledMegacities: shuffle(rawMegacities),
        greetings: rawGreetings
    }));
  }, [megacitiesData]);


  const shuffleMegacities = (megacities: Megacity[]) => {
    var getShuffledCities = mega.shuffledMegacities
    getShuffledCities.forEach(function (v,i) {
      if (v.slug === "skate-city") {
        getShuffledCities.push(getShuffledCities[i])
        getShuffledCities.splice(i,1)
      }
      if (v.slug === mega.megaIndexSlug) {
        getShuffledCities.unshift(getShuffledCities[i])
        getShuffledCities.splice(i + 1, 1)
      }
    })
    setMega(state => ({ ...state, shuffledMegacities: getShuffledCities }))

    return () => (getShuffledCities = [])
  } 

  return (
    <MegaContext.Provider value={{ mega, setMega, shuffleMegacities }}>
      {children}
    </MegaContext.Provider>
  );
};

export default MegaProvider;
