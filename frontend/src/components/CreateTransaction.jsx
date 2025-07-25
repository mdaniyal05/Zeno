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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ColorModeSelect from "./shared-theme/ColorModeSelect";
import { useNavigate } from "react-router-dom";
import { useCreateUserTransactionMutation } from "../redux/slices/transactionApiSlice";
import { useGetAllUserAccountsQuery } from "../redux/slices/bankAccountApiSlice";
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

const CreateTransactionContainer = styled(Stack)(({ theme }) => ({
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

export default function CreateTransaction(props) {
  const { data } = useGetAllUserAccountsQuery();

  const [transactionAmount, setTransactionAmount] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [accountId, setAccountId] = React.useState("");

  const navigate = useNavigate();

  const [createTransaction] = useCreateUserTransactionMutation();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await createTransaction({
        transactionAmount,
        transactionType,
        paymentMethod,
        description,
        accountId,
      }).unwrap();
      navigate("/home");
      toast.success("Transaction created successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <CreateTransactionContainer
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
            Transaction Details
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="amount">Transaction Amount</FormLabel>
              <TextField
                name="amount"
                required
                fullWidth
                id="amount"
                placeholder="120000"
                value={transactionAmount}
                onChange={(event) => setTransactionAmount(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="transactionType">Transaction Type</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="transactionType"
                    id="transactionType"
                    label="Transaction Type"
                    value={transactionType}
                    onChange={(event) => setTransactionType(event.target.value)}
                  >
                    <MenuItem value={"Income"}>Income</MenuItem>
                    <MenuItem value={"Expense"}>Expense</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="account">Bank Account</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="account"
                    id="account"
                    label="Account"
                    value={accountId}
                    onChange={(event) => setAccountId(event.target.value)}
                  >
                    {data &&
                      data.accountsData.map((account) => (
                        <MenuItem value={account.accountId}>
                          {account.accountName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="paymentMethod">Payment Method</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="paymentMethod"
                    id="paymentMethod"
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <MenuItem value={"Cash"}>Cash</MenuItem>
                    <MenuItem value={"Card"}>Card</MenuItem>
                    <MenuItem value={"Bank"}>Bank</MenuItem>
                    <MenuItem value={"Online"}>Online</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                name="description"
                multiline
                maxRows={4}
                required
                fullWidth
                id="description"
                placeholder="Online shopping with visa card"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Create Transaction
            </Button>
          </Box>
        </Card>
      </CreateTransactionContainer>
    </AppTheme>
  );
}
