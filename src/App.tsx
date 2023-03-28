import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { MyProSidebarProvider } from "./scenes/global/sidebar/SidebarContext";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
import TagList from "./scenes/tags/tagsList";
import TagsCreate from "./scenes/tags/tagsCreate";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <MyProSidebarProvider>
            <div className="app">
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/tags" element={<TagList />} />
                  <Route path="tags/create" element={<TagsCreate />} />
                  {/* <Route path="/line" element={<Line />} /> */}
                  {/* <Route path="/faq" element={<FAQ />} /> */}
                  {/* <Route path="/geography" element={<Geography />} /> */}
                  {/* <Route path="/calendar" element={<Calendar />} /> */}
                </Routes>
              </main>
            </div>
          </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
