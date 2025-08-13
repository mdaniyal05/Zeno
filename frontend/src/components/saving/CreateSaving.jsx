import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useNavigate } from "react-router-dom";
import { useCreateUserSavingMutation } from "../../redux/slices/savingApiSlice";
import { useGetAllUserAccountsQuery } from "../../redux/slices/bankAccountApiSlice";
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

const CreateSavingContainer = styled(Stack)(({ theme }) => ({
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

export default function CreateSaving(props) {
  const [title, setTitle] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [accountId, setAccountId] = React.useState("");

  const navigate = useNavigate();

  const { data } = useGetAllUserAccountsQuery();

  const [createSaving] = useCreateUserSavingMutation();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await createSaving({
        title,
        targetAmount,
        description,
        accountId,
      }).unwrap();
      navigate("/home");
      toast.success("Saving created successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <CreateSavingContainer direction="column" justifyContent="space-between">
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
            Saving Details
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                placeholder="Emergency Funds"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="targetAmount">Savings Target</FormLabel>
              <TextField
                required
                fullWidth
                id="targetAmount"
                placeholder="7000000"
                name="targetAmount"
                variant="outlined"
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                placeholder="Savings for emergency situations"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="savingAccount">Saving Account</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="savingAccount"
                    id="savingAccount"
                    label="Saving Account"
                    value={accountId}
                    onChange={(event) => setAccountId(event.target.value)}
                  >
                    {data &&
                      data.accountsData
                        .filter((account) => account.accountType === "Savings")
                        .map((account) => (
                          <MenuItem value={account.accountId}>
                            {account.accountName}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Create Saving
            </Button>
          </Box>
        </Card>
      </CreateSavingContainer>
    </AppTheme>
  );
}
