import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Topbar from "./view/global/Topbar";
import Dashboard from "./view/dashboard";
import { MyProSidebarProvider } from "./view/global/sidebar/SidebarContext";
import Team from "./view/team";
import Contacts from "./view/contacts";
import Invoices from "./view/invoices";
// import Bar from "./scenes/bar";
import Form from "./view/form";
import TagList from "./view/tags/tagList";
import TagsCreate from "./view/tags/tagCreate";
import TagView from "./view/tags/TagView";
import AuthorList from "./view/authors/AuthorList";
import AuthorCreate from "./view/authors/AuthorCreate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CategoryList from "./view/category/categoryList";
import CategoryCreate from "./view/category/CategoryCreate";
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <MyProSidebarProvider>
            <div className="app">
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="author" element={<AuthorList />} />
                  <Route path="author/create" element={<AuthorCreate />} />

                  <Route path="category" element={<CategoryList />} />
                  <Route path="category/create" element={<CategoryCreate />} />

                  <Route path="tag" element={<TagList />} />
                  <Route path="tag/create" element={<TagsCreate />} />
                  <Route path="tag/:id" element={<TagView />} />

                  {/* <Route path="/faq" element={<FAQ />} /> */}
                  {/* <Route path="/geography" element={<Geography />} /> */}
                  {/* <Route path="/calendar" element={<Calendar />} /> */}
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/form" element={<Form />} />
                </Routes>
              </main>
            </div>
          </MyProSidebarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
