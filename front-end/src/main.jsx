import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./components/contexts/User.jsx";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <SessionContextProvider supabaseClient={supabase}>
        <StrictMode>
          <App />
        </StrictMode>
      </SessionContextProvider>
    </UserProvider>
  </BrowserRouter>
);
