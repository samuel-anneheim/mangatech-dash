import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Topbar from "./view/global/Topbar";
import { MyProSidebarProvider } from "./view/global/sidebar/SidebarContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Router from "./Router";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if (!authenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function App() {
  const [theme, colorMode] = useMode();
  const { authenticated } = useContext(AuthContext);


  return (
    <>
    {!authenticated ? (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
            <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
    ) : (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div className="app">
            <main className="content">
              <Topbar />
              <Router />
            </main>
          </div>
        </MyProSidebarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
    )}
    </>
  );
}

export default App;
