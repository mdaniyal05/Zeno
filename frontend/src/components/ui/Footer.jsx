import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link
        to={`${import.meta.env.VITE_API_URL}`}
        style={{ textDecoration: "none", color: "#4ca6ff" }}
      >
        Zeno
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "left", color: "text.secondary" }}
        >
          <Link to={"https://github.com/mdaniyal05"}>
            <IconButton
              color="inherit"
              size="small"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <GitHubIcon />
            </IconButton>
          </Link>

          <Link to={"https://www.linkedin.com/in/muhammad-daniyal-009b1631b/"}>
            <IconButton
              color="inherit"
              size="small"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
