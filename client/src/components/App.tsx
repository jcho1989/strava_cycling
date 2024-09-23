import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MantineProvider } from "@mantine/core";

import { PATHS } from "../constants";
import { AuthProvider } from "../context/AuthProvider";

import AuthPage from "./AuthPage/AuthPage";
import AuthCallback from "./AuthCallback/AuthCallback";

import AuthorizedApp from "./AuthorizedApp/AuthorizedApp";
import ProtectedRoute from "../routes/ProtectedRoute";

import "./App.css";
import "@mantine/core/styles.css";

const { AUTH_CALLBACK, TOKEN, MAIN } = PATHS;

export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path={AUTH_CALLBACK} element={<AuthCallback />} />
              <Route
                path={MAIN}
                element={<ProtectedRoute element={AuthorizedApp} />}
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}
