// docs https://github.com/azouaoui-med/react-pro-sidebar
import { SetStateAction, useContext, useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./SidebarContext";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CategoryIcon from "@mui/icons-material/Category";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { TagOutlined } from "@mui/icons-material";

import jwt_decode from 'jwt-decode';
import { AuthContext } from "../../../context/AuthContext";
import Jwt from "../../../schema/jwt.type";

type Props = {
  title: string;
  to: string;
  icon: any;
  selected: string;
  setSelected: React.Dispatch<SetStateAction<string>>;
};

const Item = ({ title, to, icon, selected, setSelected }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState<string>("Dashboard");
  const { sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const {accessToken} = useContext(AuthContext);
  const jwtDecoded: Jwt = jwt_decode(accessToken ? accessToken : '');

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .ps-menu-button:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .ps-active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu>
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  MangaTech
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="130px"
                  height="130px"
                  src={"../../assets/logo.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {jwtDecoded.username.split('@')[0]}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Authors"
              to="/author"
              icon={<BorderColorOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Category"
              to="/category"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Collection"
              to="/collection"
              icon={<CollectionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Editon"
              to="/edition"
              icon={<AutoAwesomeMotionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Editor"
              to="/editor"
              icon={<BuildOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tags"
              to="/tag"
              icon={<TagOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User"
              to="/user"
              icon={<GroupOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Volume"
              to="/volume"
              icon={<MenuBookOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
