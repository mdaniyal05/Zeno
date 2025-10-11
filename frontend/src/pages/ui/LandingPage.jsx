import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../../components/shared-theme/AppTheme";
import NavBar from "../../components/ui/NavBar";
import Hero from "../../components/ui/Hero";
import Footer from "../../components/ui/Footer";

const LandingPage = (props) => {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Hero />
      <Footer />
    </AppTheme>
  );
};

export default LandingPage;
