import { useQuery } from "react-query";
import { api } from "../api";

export async function getPizzas() {
  const response = await api.get("/pizzas").then((response) => response.data);
  return response;
}

export function usePizzas(options) {
  return useQuery("pizzas", getPizzas, {
    ...options,
  });
}
