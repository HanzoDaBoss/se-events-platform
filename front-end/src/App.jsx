import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import EventsList from "./components/EventsList";

function App() {
  return (
    <>
      {/* <Login></Login> */}
      <EventsList></EventsList>
    </>
  );
}

export default App;
