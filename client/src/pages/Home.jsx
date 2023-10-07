import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import { useUserContext } from "../context/UserContext";
export default function Home() {
  const { user } = useUserContext();

  return user ? <Dashboard userData={user} /> : <Landing />;
}
