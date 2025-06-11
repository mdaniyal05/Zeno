import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import MainGrid from "./components/MainGrid";
import SideMenu from "./components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Dashboard(props) {
  const [activeItem, setActiveItem] = React.useState("Home");

  const handleMenuItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu
          onMenuItemClick={handleMenuItemClick}
          activeItem={activeItem}
        />
        <AppNavbar
          onMenuItemClick={handleMenuItemClick}
          activeItem={activeItem}
        />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header activeItem={activeItem} />
            <MainGrid activeItem={activeItem} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
