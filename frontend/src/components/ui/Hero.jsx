import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(/dashboard2.png)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(/dashboard1.png)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

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
          <div>
            <p style={{ color: "red" }}>
              The Email Service is Down due to free trial of SendGrid. It will
              be fixed soon.
            </p>
          </div>
          <Link to={"/signin"} style={{ textDecoration: "none" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "150px" } }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                fullWidth
                sx={{ minWidth: "fit-content" }}
              >
                Start now
              </Button>
            </Stack>
          </Link>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
