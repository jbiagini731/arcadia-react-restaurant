import { useState } from "react";
import { NewFood } from "../food";

const newFood: NewFood = {
  description: "",
  image: "",
  name: "",
  price: 0,
  tags: [],
};

export const component = function Admin() {
  const [food, setFood] = useState(newFood);
  return (
    <>
      <h1 className="p-2">Admin Form</h1>
      <form className="p-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          onChange={(event) => {
            setFood({ ...food, name: event.target.value });
          }}
          type="text"
          className="border-2 border-gray-400 rounded-md"
          value={food.name}
        />
        <label htmlFor="description" className="block">
          Description
        </label>
        <input
          id="description"
          onChange={(event) => {
            setFood({ ...food, description: event.target.value });
          }}
          type="text"
          className="border-2 border-gray-400 rounded-md"
          value={food.description}
        />
        <label htmlFor="price" className="block">
          Price
        </label>
        <input
          id="price"
          onChange={(event) => {
            setFood({ ...food, price: Number(event.target.value) });
          }}
          type="text"
          className="border-2 border-gray-400 rounded-md"
          value={food.price}
        />
        {/* <label className="block">Tags</label>
        <input
          onChange={(event) => {
            setFood({ ...food, tags: [event.target.value] });
          }}
          type="text"
          className="border-2 border-gray-400 rounded-md"
          value={food.price}
        /> */}
      </form>
    </>
  );
};
