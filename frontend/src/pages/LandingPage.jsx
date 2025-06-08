import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../components/shared-theme/AppTheme";
import NavBar from "../components/NavBar";

const LandingPage = (props) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
    </AppTheme>
  );
};

export default LandingPage;
