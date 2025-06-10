import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "./shared-theme/AppTheme";
import { useSelector } from "react-redux";
import { useCreateUserAccountMutation } from "../redux/slices/bankAccountApiSlice";
import { useNavigate } from "react-router-dom";
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

const CreateBankAccountContainer = styled(Stack)(({ theme }) => ({
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

export default function CreateBankAccount(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const [accountName, setAccountName] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [accountBalance, setAccountBalance] = React.useState(0);
  const [accountCurrency, setAccountCurrency] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");

  const navigate = useNavigate();

  const [createAccount] = useCreateUserAccountMutation();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await createAccount({
        accountName,
        accountType,
        accountBalance,
        accountCurrency,
        bankName,
        accountNumber,
      }).unwrap();
      navigate(`/home`);
      toast.success("Account created successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <CreateBankAccountContainer
        direction="column"
        justifyContent="space-between"
      >
        <Card variant="outlined">
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
            {userInfo.fullName}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Create Bank Account
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="accountName">Account name</FormLabel>
              <TextField
                autoComplete="accountName"
                name="naccountName"
                fullWidth
                id="accountName"
                placeholder="Savings account"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountType">Account type</FormLabel>
              <TextField
                autoComplete="accountType"
                name="accountType"
                fullWidth
                id="accountType"
                placeholder="Current, Default, Savings"
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountBalance">Account balance</FormLabel>
              <TextField
                autoComplete="accountBalance"
                name="accountBalance"
                fullWidth
                id="accountBalance"
                placeholder="25000000"
                value={accountBalance}
                onChange={(event) => setAccountBalance(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountCurrency">Account currency</FormLabel>
              <TextField
                autoComplete="accountCurrency"
                name="accountCurrency"
                fullWidth
                id="accountCurrency"
                placeholder="USD"
                value={accountCurrency}
                onChange={(event) => setAccountCurrency(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bankName">Bank name</FormLabel>
              <TextField
                autoComplete="bankName"
                name="bankName"
                fullWidth
                id="bankName"
                placeholder="Meezan Bank"
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountNumber">Account number</FormLabel>
              <TextField
                autoComplete="accountNumber"
                name="accountNumber"
                fullWidth
                id="accountNumber"
                placeholder="4451672569"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Create
            </Button>
          </Box>
        </Card>
      </CreateBankAccountContainer>
    </AppTheme>
  );
}
