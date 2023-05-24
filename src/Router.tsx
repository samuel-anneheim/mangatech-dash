import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Topbar from "./view/global/Topbar";
import Dashboard from "./view/dashboard";
import { MyProSidebarProvider } from "./view/global/sidebar/SidebarContext";
import TagList from "./view/tags/tagList";
import TagsCreate from "./view/tags/tagCreate";
import AuthorList from "./view/authors/AuthorList";
import AuthorCreate from "./view/authors/AuthorCreate";
import CategoryList from "./view/category/CategoryList";
import CategoryCreate from "./view/category/CategoryCreate";
import EditorList from "./view/editor/EditorList";
import EditorCreate from "./view/editor/EditorCreate";
import CollectionList from "./view/collection/CollectionList";
import CollectionCreate from "./view/collection/CollectionCreate";
import EditionList from "./view/edition/EditionList";
import EditionCreate from "./view/edition/EditionCreate";
import NotFound from "./view/global/NotFound";
import VolumeList from "./view/volume/VolumeList";
import VolumeCreate from "./view/volume/VolumeCreate";
import UserList from "./view/ user/UserList";
import UserCreate from "./view/ user/UserCreate";
import Connexion from "./view/connexion/Connexion";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  if (!authenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const Router = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="login" element={<Connexion />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="author" element={<AuthorList />} />
        <Route path="author/:id" element={<AuthorCreate status="view" />} />
        <Route
          path="author/create"
          element={<AuthorCreate status="create" />}
        />
        <Route
          path="author/edit/:id"
          element={<AuthorCreate status="edit" />}
        />

        <Route path="category" element={<CategoryList />} />
        <Route path="category/:id" element={<CategoryCreate status="view" />} />
        <Route
          path="category/create"
          element={<CategoryCreate status="create" />}
        />
        <Route
          path="category/edit/:id"
          element={<CategoryCreate status="edit" />}
        />

        <Route path="collection" element={<CollectionList />} />
        <Route
          path="collection/:id"
          element={<CollectionCreate status="view" />}
        />
        <Route
          path="collection/create"
          element={<CollectionCreate status="create" />}
        />
        <Route
          path="collection/edit/:id"
          element={<CollectionCreate status="edit" />}
        />

        <Route path="edition" element={<EditionList />} />
        <Route path="edition/:id" element={<EditionCreate status="view" />} />
        <Route
          path="edition/create"
          element={<EditionCreate status="create" />}
        />
        <Route
          path="edition/edit/:id"
          element={<EditionCreate status="edit" />}
        />

        <Route path="editor" element={<EditorList />} />
        <Route path="editor/:id" element={<EditorCreate status="view" />} />
        <Route
          path="editor/create"
          element={<EditorCreate status="create" />}
        />
        <Route
          path="editor/edit/:id"
          element={<EditorCreate status="edit" />}
        />

        <Route path="tag" element={<TagList />} />
        <Route path="tag/:id" element={<TagsCreate status="view" />} />
        <Route path="tag/create" element={<TagsCreate status="create" />} />
        <Route path="tag/edit/:id" element={<TagsCreate status="edit" />} />

        <Route path="volume" element={<VolumeList />} />
        <Route path="volume/:id" element={<VolumeCreate status="view" />} />
        <Route
          path="volume/create"
          element={<VolumeCreate status="create" />}
        />
        <Route
          path="volume/edit/:id"
          element={<VolumeCreate status="edit" />}
        />

        <Route path="user" element={<UserList />} />
        <Route path="user/:id" element={<UserCreate status="view" />} />
        <Route path="user/create" element={<UserCreate status="create" />} />
        <Route path="user/edit/:id" element={<UserCreate status="edit" />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
