import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../../components/shared-theme/AppTheme";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

const LandingPage = (props) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Hero />
    </AppTheme>
  );
};

export default LandingPage;
