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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserAccountQuery,
  useUpdateUserAccountMutation,
} from "../../redux/slices/bankAccountApiSlice";
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

const UpdateBankAccountContainer = styled(Stack)(({ theme }) => ({
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

export default function UpdateBankAccount(props) {
  const { id } = useParams();
  const { data } = useGetUserAccountQuery(id);

  const [accountName, setAccountName] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [accountBalance, setAccountBalance] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");

  const navigate = useNavigate();

  const [updateAccount] = useUpdateUserAccountMutation();

  React.useEffect(() => {
    if (data) {
      setAccountName(data.accountName || "");
      setAccountType(data.accountType || "");
      setAccountBalance(data.accountBalance || "");
      setBankName(data.bankName || "");
      setAccountNumber(data.accountNumber || "");
    }
  }, [data]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await updateAccount({
        id: id,
        accountName,
        accountType,
        accountBalance,
        bankName,
        accountNumber,
      }).unwrap();
      navigate("/home");
      toast.success("Bank account updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <UpdateBankAccountContainer
        direction="column"
        justifyContent="space-between"
      >
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
            Update Account
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Account Name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Crypto account"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountType">Account Type</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="accountType"
                    id="accountType"
                    label="Account Type"
                    value={accountType}
                    onChange={(event) => setAccountType(event.target.value)}
                  >
                    <MenuItem value={"Current"}>Current</MenuItem>
                    <MenuItem value={"Default"}>Default</MenuItem>
                    <MenuItem value={"Savings"}>Savings</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountBalance">Account Balance</FormLabel>
              <TextField
                required
                fullWidth
                id="accountBalance"
                placeholder="2000000"
                name="accountBalance"
                variant="outlined"
                value={accountBalance}
                onChange={(event) =>
                  setAccountBalance(Number(event.target.value))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bankName">Bank Name</FormLabel>
              <TextField
                required
                fullWidth
                name="bankName"
                placeholder="Meezan Bank"
                id="bankName"
                variant="outlined"
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
              <TextField
                required
                fullWidth
                name="accountNumber"
                placeholder="4786235490"
                id="accountNumber"
                variant="outlined"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
      </UpdateBankAccountContainer>
    </AppTheme>
  );
}
