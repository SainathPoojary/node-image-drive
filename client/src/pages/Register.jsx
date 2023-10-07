import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, user } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
      <form className="flex flex-col items-center space-y-4 w-10/12 md:w-1/2 lg:1/3 2xl:w-1/4.5">
        <h1 className="font-medium text-2xl">Create your account</h1>
        <Input
          type={"name"}
          placeholder={"Full name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text={"Sign up"} onClick={handleRegister} />
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="text-secondary font-medium text-lg">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
