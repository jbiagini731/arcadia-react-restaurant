import React, { useState } from "react";
import { NewFood, foodTags } from "../food";
import { Input } from "../shared/Input";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Error } from "../shared/Error";

type Status = "idle" | "submitted" | "submitting";

const newFood: NewFood = {
  description: "",
  image: "",
  name: "",
  price: 0,
  tags: [],
};
type Errors = {
  description?: string;
  image?: string;
  name?: string;
  price?: string;
  tags?: string;
};

export const component = function Admin() {
  const [status, setStatus] = useState<Status>("idle");
  const [food, setFood] = useState(newFood);

  const navigate = useNavigate();

  function validateFoodForm() {
    const errors: Errors = {};
    if (!food.name) errors.name = "Name is required";
    if (!food.description) errors.description = "Description is required";
    if (!food.tags.length) errors.tags = "At least one tag is required";
    return errors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setStatus("submitted");
    event.preventDefault(); // prevent browser from reloading

    if (Object.keys(errors).length > 0) {
      return;
    }
    setStatus("submitting");
    await fetch("http://localhost:4001/foods", {
      method: "POST",
      body: JSON.stringify(food),
      headers: { "Content-Type": "application/json" },
    });
    toast.success("Food added successfully!");
    navigate({ to: "/" });
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFood((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }

  const errors = validateFoodForm();
  return (
    <>
      <form className="p-2" onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          value={food.name}
          id="name"
          onChange={onChange}
          label="Name"
          error={status === "submitted" ? errors.name : ""}
        />

        <Input
          className="mb-4"
          value={food.description}
          id="description"
          onChange={onChange}
          label="Description"
          error={status === "submitted" ? errors.description : ""}
        />

        <Input
          type="number"
          className="mb-4"
          value={food.price}
          id="price"
          onChange={onChange}
          label="Price"
          error={status === "submitted" ? errors.price : ""}
        />

        <fieldset className="mb-4">
          <legend className="font-bold">Tags</legend>
          {status === "submitted" && errors.tags && (
            <Error errorMessage={errors.tags} />
          )}
          <ul>
            {foodTags.map((tag) => {
              const tagId = "tag-" + tag;

              return (
                <li key={tag}>
                  <input
                    id={tagId}
                    type="checkbox"
                    value={tag}
                    checked={food.tags.some((foodTag) => foodTag === tag)}
                    onChange={(event) => {
                      setFood({
                        ...food,
                        tags: event.target.checked
                          ? [...food.tags, tag]
                          : food.tags.filter((t) => t !== tag),
                      });
                    }}
                  />
                  <label htmlFor={tagId}>{tag}</label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <button className="border p-1 rounded bg-blue-400" type="submit">
          Add Food
        </button>
      </form>
    </>
  );
};
