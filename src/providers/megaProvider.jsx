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

export const MegaContext = createContext(null);

const MegaProvider = ({ children }) => {

  const [mega, setMega] = useState({
    megacities: [],
    greetings: [],
    url: "https://thefilterman.de/artwork/megacities/",
    megaIndexSlug: "",
    navOpen: false,
  });

  useEffect(() => {
    const rawMegacities = []
    megacitiesData.map(megacity => {
      return rawMegacities.push(megacity)
    });
    const rawGreetings = []
    greetingsData.map(greet => {
      return rawGreetings.push(greet)
    })



    setMega(state => ({ 
        ...state,
        megacities: shuffle(rawMegacities),
        greetings: shuffle(rawGreetings)
    }));
  }, [megacitiesData]);


  useEffect(() => {
    var getShuffledCities = mega.megacities;
    getShuffledCities.forEach(function(v,i) {
        if (v.slug === 'skate-city') {
            getShuffledCities.push(getShuffledCities[i])
            getShuffledCities.splice(i, 1)
        }
        if (v.slug === mega.megaIndexSlug) {
            getShuffledCities.unshift(getShuffledCities[i])
            getShuffledCities.splice(i + 1, 1)
        }
    })
    setMega(state => ({ ...state, shuffledMegacities: getShuffledCities }));

    return () => getShuffledCities = {}
  }, [mega.megacities, mega.megaIndexSlug])

  return (
    <MegaContext.Provider
        value={[mega, setMega]}
    >
        {children}
    </MegaContext.Provider>
  );
};

export default MegaProvider;
