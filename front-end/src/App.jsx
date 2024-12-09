import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EventsList from "./components/EventsList";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<EventsList />}></Route>
      </Routes>
    </>
  );
}

export default App;
