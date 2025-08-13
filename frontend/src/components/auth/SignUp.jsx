import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/slices/authApiSlice";
import { useGenerateOtpMutation } from "../../redux/slices/otpApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxHeight: "100%",
  overflowY: "auto",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [OTP, setOTP] = React.useState("");
  const [isMailSent, setIsMailSent] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const [generateOTP] = useGenerateOtpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const sendMailHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await generateOTP({
        email,
      }).unwrap();

      if (res) {
        toast.info(`OTP code sent to ${email}.`);
        setIsMailSent(true);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        OTP,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/home");
      toast.success("You are registered successfully. Welcome!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isMailSent ? (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />
          <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
              <Typography
                component="span"
                variant="h1"
                sx={(theme) => ({
                  fontSize: "inherit",
                  marginRight: 1,
                  color: "primary.main",
                  ...theme.applyStyles("dark", {
                    color: "primary.light",
                  }),
                })}
              >
                ZENO
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Verify OTP
              </Typography>
              <Box
                component="form"
                onSubmit={submitHandler}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="OTP">OTP</FormLabel>
                  <TextField
                    autoComplete="OTP"
                    name="OTP"
                    required
                    fullWidth
                    id="OTP"
                    placeholder="000000"
                    value={OTP}
                    onChange={(event) => setOTP(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Confirm password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Verify
                </Button>
              </Box>
            </Card>
          </SignUpContainer>
        </AppTheme>
      ) : (
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          />
          <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
              <Typography
                component="span"
                variant="h1"
                sx={(theme) => ({
                  fontSize: "inherit",
                  marginRight: 1,
                  color: "primary.main",
                  ...theme.applyStyles("dark", {
                    color: "primary.light",
                  }),
                })}
              >
                ZENO
              </Typography>
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={sendMailHandler}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="name">Last name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Sign up
                </Button>
              </Box>
              <Divider>
                <Typography sx={{ color: "text.secondary" }}>or</Typography>
              </Divider>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography sx={{ textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link
                    to={"/signin"}
                    style={{ textDecoration: "none", color: "#4598eb" }}
                  >
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Card>
          </SignUpContainer>
        </AppTheme>
      )}
    </>
  );
}
