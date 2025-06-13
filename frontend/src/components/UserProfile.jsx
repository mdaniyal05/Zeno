import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./shared-theme/AppTheme";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../redux/slices/userApiSlice";
import { Link } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("md")]: {
    width: "600px",
    height: "500px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const ProfileContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function UserProfile(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetProfileQuery(userInfo.userId);

  let dateOfBirth;

  if (data) {
    dateOfBirth = data.dateOfBirth.slice(0, 10);
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ProfileContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "1.5rem",
              marginRight: 1,
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            USER PROFILE
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {data && `${data.firstName} ${data.lastName}`}
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "1.2rem",
              marginRight: 1,
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            {`Date of Birth : ${dateOfBirth}`}
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "1.2rem",
              marginRight: 1,
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            {data && `About : ${data.about}`}
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "1.2rem",
              marginRight: 1,
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            {data && `Phone number : ${data.phoneNumber}`}
          </Typography>
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "1.2rem",
              marginRight: 1,
              color: "primary.main",
              ...theme.applyStyles("dark", {
                color: "primary.light",
              }),
            })}
          >
            {data && `Email : ${data.email}`}
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "20rem",
            }}
          >
            <Link to={`/update-profile/${userInfo.userId}`}>
              <Button type="submit" variant="contained">
                Update Profile
              </Button>
            </Link>
          </Box>
        </Card>
      </ProfileContainer>
    </AppTheme>
  );
}
