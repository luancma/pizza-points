import { useQuery } from "react-query";
import { api } from "../api";

export async function getUser() {
  const data = await api.get("/users/1").then((response) => response.data);
  return data;
}

export function useUsers(options) {
  return useQuery("users", getUser, {
    ...options, 
  });
}
