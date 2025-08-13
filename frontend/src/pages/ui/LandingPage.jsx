import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../../components/shared-theme/AppTheme";
import NavBar from "../../components/ui/NavBar";
import Hero from "../../components/ui/Hero";

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
