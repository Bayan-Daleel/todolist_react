import { createContext } from "react"; 
import React, { useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider =({children})=>{
  const [Lang, setLang] = useState("ar");

  return (
    <LanguageContext.Provider value={{ Lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
} 
 export default LanguageContext;