import { useState } from "react";
import { FoodTag, foodTags } from "../food";
import { Card } from "../Card";
import { useDeleteFood, useFoods } from "../hooks/useFoods";
import toast from "react-hot-toast";

export const component = function Index() {
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");

  // Alias data to foods
  const { data: foods = [], isLoading } = useFoods();
  const { mutate: deleteFood } = useDeleteFood(() => {
    toast.success("Food deleted successfully!");
  });

  if (isLoading) return <p>Loading...</p>;

  // Derived state
  const matchingFoods = !selectedTag
    ? foods
    : foods.filter((food) => food.tags.includes(selectedTag));

  return (
    <>
      <h1>Menu</h1>
      <label htmlFor="tag-filter">Filter by tag</label>
      <select
        id="tag-filter"
        value={selectedTag}
        onChange={(event) => {
          setSelectedTag(event.target.value as FoodTag);
        }}
      >
        <option key="all-key" value="">
          All
        </option>
        {foodTags.map((tag) => {
          return (
            <option key={tag} className="border border-l-rose-700">
              {tag}
            </option>
          );
        })}
      </select>
      <h2>
        {selectedTag &&
          `${matchingFoods.length} matching food${(matchingFoods.length > 1 && "s") || ""} found`}
      </h2>
      <div className="flex flex-wrap">
        {matchingFoods.map((food) => (
          <Card key={food.id}>
            <div className="flex justify-between">
              <div className="w-48">
                <h2>{food.name}</h2>
                <button
                  aria-label={"Delete " + food.name}
                  className="text-red-500 hover:cursor-pointer"
                  onClick={() => deleteFood(food.id)}
                >
                  Delete
                </button>
                <p>{food.description}</p>
                <p>${food.price}</p>
                <p>
                  <span className="font-bold">Tags</span>:{" "}
                  {food.tags.join(", ")}
                </p>
              </div>
              <div className="w-36">
                <img
                  className="w-32 rounded"
                  alt={food.name}
                  src={`/images/${food.image}`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
