import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Topbar from "./view/global/Topbar";
import Dashboard from "./view/dashboard";
import { MyProSidebarProvider } from "./view/global/sidebar/SidebarContext";
import TagList from "./view/tags/tagList";
import TagsCreate from "./view/tags/tagCreate";
import TagView from "./view/tags/TagView";
import AuthorList from "./view/authors/AuthorList";
import AuthorCreate from "./view/authors/AuthorCreate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CategoryList from "./view/category/CategoryList";
import CategoryCreate from "./view/category/CategoryCreate";

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
