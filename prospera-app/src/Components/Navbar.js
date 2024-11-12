import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import Logo from "../Assets/Logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BarChartIcon from "@mui/icons-material/BarChart";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation(); // Get current route location

  // Define menu items
  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Begin", icon: <PlayArrowIcon />, path: "/input-form" },
    { text: "Results", icon: <BarChartIcon />, path: "/results" },
  ];

  // Determine active index based on the current location
  const getActiveIndex = () => {
    const currentPath = location.pathname;
    const activeIndex = menuOptions.findIndex(item => item.path === currentPath);
    return activeIndex !== -1 ? activeIndex : 0; // Default to 'Home' if not found
  };

  const activeIndex = getActiveIndex(); // Get the active index dynamically

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-links-container">
        {menuOptions.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`navbar-link ${activeIndex === index ? "active" : ""}`}
          >
            {item.text}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {/* Drawer for Mobile View */}
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
