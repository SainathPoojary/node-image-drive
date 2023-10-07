import React from "react";
import { useUserContext } from "../context/UserContext";
import Card from "./Card";

export default function Main() {
  const { user } = useUserContext();

  return (
    <div className="bg-primary flex-1 mx-2 md:mb-2 md:mr-4 rounded-[2rem] p-8 md:p-12 overflow-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 ">
        {user.images
          .slice(0)
          .reverse()
          .map((image) => {
            return <Card key={image._id + Math.random()} image={image} />;
          })}
      </div>
    </div>
  );
}
