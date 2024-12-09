import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EventsList from "./components/EventsList";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import EventPage from "./components/EventPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<EventsList />}></Route>
        <Route path="/events/:event_id" element={<EventPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
