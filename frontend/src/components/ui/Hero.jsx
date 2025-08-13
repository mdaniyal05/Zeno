import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
              alignItems: "center",
              fontSize: {
                xs: "clamp(2rem, 10vw, 2.5rem)",
                md: "clamp(3rem, 10vw, 3.5rem)",
              },
            }}
          >
            Take&nbsp;Control&nbsp;Of&nbsp;Your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              Finances
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Track your income, expenses, and savings all in one place. Stay on
            top of your financial goals with simple, powerful tools designed to
            make budgeting effortless.
          </Typography>
          <Link to={"/signin"} style={{ textDecoration: "none" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                sx={{ minWidth: "fit-content" }}
              >
                Start now
              </Button>
            </Stack>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
