import React from "react";
import { useUserContext } from "../context/UserContext";

export default function Header({ setToggle }) {
  const { user } = useUserContext();
  return (
    <div className="flex justify-between items-center bg-black text-white px-8 py-4">
      <div className="flex justify-center items-center space-x-4">
        <button onClick={() => setToggle((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-white h-8 w-8"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
        <h1 className="text-xl font-medium">Image Drive</h1>
      </div>
      <div className="px-8 py-2 bg-primary rounded-full text-md capitalize">
        <p>{user.name}</p>
      </div>
    </div>
  );
}
