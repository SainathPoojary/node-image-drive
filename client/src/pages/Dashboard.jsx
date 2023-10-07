import axios from "axios";
import React, { useContext, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Aside, Header, Main } from "../components";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  // If Mobile device then false else true
  const [toggle, setToggle] = useState(() => {
    if (window.innerWidth <= 768) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div className="flex flex-col h-screen">
      <Header setToggle={setToggle} />
      <div className="flex h-[78vh] md:h-[91vh]">
        {toggle && <Aside setToggle={setToggle} />}
        <Main />
      </div>
    </div>
  );
}
