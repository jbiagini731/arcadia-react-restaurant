import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <section className="bg-green-400 border-1 border-gray-500 shadow rounded m-2 p-2 mw-96">
      {props.children}
    </section>
  );
}
