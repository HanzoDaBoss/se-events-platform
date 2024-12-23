import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { Route, Routes, Navigate } from "react-router";

import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import EventPage from "./components/EventPage";
import HomePage from "./components/HomePage";
import SignInSuccessGooglePage from "./components/SignInSuccessGooglePage";
import RegisterPage from "./components/RegisterPage";
import RegisterSuccessPage from "./components/RegisterSuccessPage";
import StaffDashboard from "./components/staff/StaffDashboard";
import StaffEvents from "./components/staff/StaffEvents";
import EventsPage from "./components/EventsPage";
import UpdateEventPage from "./components/staff/UpdateEventPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [event, setEvent] = useState({});
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/events" element={<StaffEvents />} />
        <Route path="/staff/events/:event_id" element={<UpdateEventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/success" element={<RegisterSuccessPage />} />
        <Route
          path="login-google/success"
          element={<SignInSuccessGooglePage />}
        />
        <Route path="/events" element={<EventsPage />} />
        <Route
          path="/events/:event_id"
          element={<EventPage event={event} setEvent={setEvent} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
