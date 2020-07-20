import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newValue, replace = false) {
    if (replace) {
      history[history.length - 1] = newValue;
      setHistory(history);
    } else {
      setHistory([...history, newValue]);
    }
    setMode(newValue);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      const index = history.length - 1;
      setHistory(history);
      setMode(history[index]);
    }
  }

  return {
    mode,
    transition,
    back,
    history,
  };
}
