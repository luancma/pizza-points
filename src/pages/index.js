import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { PizzaList } from "../components/PizzaList";
import { PromotionList } from "../components/PromotionList";
import { ProjectContext } from "../context/projectContext";
import { api } from "../service/api";

export default function Home({ propsResponse }) {
  const store = useContext(ProjectContext);

  useQuery(
    "pizzas",
    async () => api.get("/pizzas").then((response) => response.data),
    {
      initialData: propsResponse.pizzas,
    }
  );

  useEffect(() => {
    if (store.step.currentStep > 1) {
      store.step.resetStep();
    }
  }, []);

  return (
    <>
      <PromotionList />
      <PizzaList />
    </>
  );
}

export async function getStaticProps() {
  const response = await api.get("/pizzas").then((response) => response.data);

  const propsResponse = {
    pizzas: response,
  };

  return { props: { propsResponse } };
}
