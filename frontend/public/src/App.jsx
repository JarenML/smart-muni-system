import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { RequestProvider } from "./contexts/RequestContext";
import { ResumeProvider } from "./contexts/ResumeContext";

import AppRouter from "./routes/AppRouter";

import "./index.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <RequestProvider>
            <ResumeProvider>
              <AppRouter />
            </ResumeProvider>
          </RequestProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
