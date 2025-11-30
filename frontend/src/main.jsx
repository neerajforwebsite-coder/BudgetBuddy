// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store/store.js";

// ThemeProvider
import { ThemeProvider } from "./context/ThemeContext";

// Create React Query client
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>

        {/* Global Theme */}
        <ThemeProvider>
          <App />
        </ThemeProvider>

      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
