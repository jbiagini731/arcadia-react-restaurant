import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Food, NewFood } from "../food";

const baseUrl = "http://localhost:4001/foods/";

export function useFoods() {
  // Alias data to foods
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const resp = await fetch(baseUrl);
      return (await resp.json()) as Food[];
    },
  });
}

export function useAddFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (food: NewFood) => {
      fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(food),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
}

export function useDeleteFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (foodId: number) => {
      fetch(baseUrl + foodId, {
        method: "DELETE",
      });
    },
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
}
