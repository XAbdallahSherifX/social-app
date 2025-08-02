import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [counter, setcounter] = useState(0);
  const [hambozo, sethambozo] = useState("hambozo")

  function changeCounter() {
    setcounter(Math.random());
  }

  return (
    <CounterContext.Provider value={{ counter, changeCounter, hambozo }}>
      {/*  app  */}
      {props.children}
    </CounterContext.Provider>
  );
}
