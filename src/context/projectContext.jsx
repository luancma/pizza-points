import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const ProjectContext = createContext({});

export function ProjectContextProvider({ children }) {
  const router = useRouter();

  const [score, setScore] = useState(0);

  const [steps, setSteps] = useStickyState(1, "steps");

  const [size, setSize] = useStickyState("Pequena - Pizza brotinho!", "size");

  const [border, setBorder] = useStickyState("", "border");

  const options = {
    2: [
      {
        slug: "pequena",
        name: "Pequena - Pizza brotinho!",
        price: 10,
      },
      {
        slug: "media",
        name: "Média  - Pizza com 4 fatias!",
        price: 15,
      },
      {
        slug: "grande",
        name: "Grande  - Pizza com 8 fatias!",
        price: 25,
      },
      {
        slug: "gigante",
        name: "Gigante - Pizza com 12 fatias",
        price: 30,
      },
    ],
    3: [
      {
        slug: "normal",
        name: "Sem recheio",
        price: 0,
      },
      {
        slug: "catupiry",
        name: "Borda com Catupiry",
        price: 10,
      },
      {
        slug: "cheddar",
        name: "Borda com Cheddar",
        price: 12,
      },
      {
        slug: "catupiry",
        name: "Borda com Catupiry e Bacon",
        price: 16,
      },
      {
        slug: "cheddar",
        name: "Borda com Cheddar e Bacon",
        price: 20,
      },
    ],
  };

  const incrementScore = (points) => setScore(score + points);

  const incrementStep = () => {
    if (steps === 3) {
      return console.log("Abrir uma modal");
    }
    setSteps(steps + 1);
  };

  const decrementStep = () => {
    if (steps > 2) {
      return setSteps(steps - 1);
    }
    if (steps === 2) {
      router.push({
        pathname: "/",
      });
      return setSteps(steps - 1);
    }
  };

  const resetStep = () => setSteps(1);

  const store = {
    score: {
      points: score,
      incrementScore,
    },
    step: {
      currentStep: steps,
      incrementStep,
      decrementStep,
      resetStep,
    },
    pizzaSize: {
      size,
      setSize,
    },
    pizzaBorder: {
      border,
      setBorder,
    },
    options,
  };

  // useEffect(() => {
  //   if (steps === 1) {
  //     return router.push("/");
  //   }
  // }, [steps]);

  return (
    <ProjectContext.Provider value={store}>{children}</ProjectContext.Provider>
  );
}
