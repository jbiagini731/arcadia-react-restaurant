import { useEffect, useState } from "react";
import { Food } from "./food";

export function Menu() {
  const [foods, setFoods] = useState<Food[]>([]); // generic type argument set to an array of Food objects

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:4001/foods");
      const _foods = (await resp.json()) as Food[];
      setFoods(_foods);
    }
    fetchData();
  }, []);

  // debugger;

  return (
    <>
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="flex flex-wrap ">
        {foods.map((food) => (
          <section
            key={food.id}
            className="bg-green-400 border-1 border-gray-500 shadow rounded m-2 p-2 mw-96"
          >
            <div className="flex flex-wrap justify-between ">
              <div className="w-48">
                <h2 className="font-bold">{food.name}</h2>
                <p className="font-thin">{food.description}</p>
                <p className="font-extrabold">${food.price}</p>
                <button
                  className="bg-red-600 rounded"
                  onClick={() => {
                    setFoods((prevFoods) => {
                      // setting state is async
                      const newFoods = prevFoods.filter((f) => f !== food); // setting state to variable allows it to be logged properly
                      console.log(newFoods);
                      return newFoods; // new state
                    });
                  }}
                >
                  Delete
                </button>{" "}
              </div>
              <div className="w-36">
                <img
                  alt={food.name}
                  className="w-32 rounded"
                  src={`/images/${food.image}`}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
