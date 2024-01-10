import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { youtube } from "../../Redux/Store";
import { downloadCategoryAction } from "../../Redux/CategoriesReducer";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export function Menu({open,handleDrawerToggle,}
  : {open: boolean; handleDrawerToggle: () => void;}): JSX.Element {
  
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState(false);

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassName : ""}`
      }
    >
      {props.children}
    </NavLink>
  ));

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <Drawer variant="temporary" open={open} onClose={handleDrawerToggle}>
      <div className="Menu">
        <h2>Main Menu</h2>
        <Divider />
        <List>
          <ListItem component={MyNavLink} to="/" activeClassName="active" exact>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="All Songs" />
          </ListItem>
          <ListItem
            component={MyNavLink}
            to="/addSong"
            activeClassName="active"
          >
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Song" />
          </ListItem>
          <ListItem
            component={MyNavLink}
            to="/addCategory"
            activeClassName="active"
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>
          <ListItem component={MyNavLink} to="/search" activeClassName="active">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Song Search" />
          </ListItem>
          <ListItem
            component={MyNavLink}
            to="/favorites"
            activeClassName="active"
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem component={MyNavLink} to="/about" activeClassName="active">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About the app" />
          </ListItem>
        </List>
        <Divider />
        <div className="myCategories">
          <List>
            <ListItem onClick={handleCategoriesClick}>
              <ListItemText primary="Categories" />
              {openCategories ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCategories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {youtube.getState().category.categories.map((item) => (
                  <ListItem key={item.id}>
                    <NavLink
                      to={`/category/${item.id}`}
                      onClick={() => {
                        handleDrawerToggle(); // Close the drawer when a category is clicked
                        navigate(`/category/${item.id}`);
                      }}
                    >
                      <ListItemText primary={item.name} />
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </Drawer>
  );
}

export default Menu;
