import React from "react";
import "./assets/styles/base.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/mui";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routing/Routing";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div className={"app"}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
