import React from "react";
import Login from "./Login";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <div className="flex flex-col space-y-4 w-10/12 md:w-1/4.5">
        <Link to="/login">
          <Button text={"Login"} />
        </Link>
        <Link to="/signup">
          <Button text={"Register"} />
        </Link>
      </div>
    </div>
  );
}
