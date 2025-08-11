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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  useGetUserIncomeQuery,
  useUpdateUserIncomeMutation,
} from "../redux/slices/incomeApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";

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

const UpdateIncomeContainer = styled(Stack)(({ theme }) => ({
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

export default function UpdateIncome(props) {
  const { id } = useParams();
  const { data } = useGetUserIncomeQuery(id);

  const [incomeAmount, setIncomeAmount] = React.useState("");
  const [incomeDate, setIncomeDate] = React.useState();
  const [incomeSource, setIncomeSource] = React.useState("");

  const navigate = useNavigate();

  const [updateIncome] = useUpdateUserIncomeMutation();

  React.useEffect(() => {
    if (data) {
      setIncomeAmount(data.incomeAmount || "");
      setIncomeDate(data.incomeDate || "");
      setIncomeSource(data.incomeSource || "");
    }
  }, [data]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await updateIncome({
        id: id,
        incomeAmount,
        incomeDate,
        incomeSource,
      }).unwrap();
      navigate(`/home`);
      toast.success("Income updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <UpdateIncomeContainer direction="column" justifyContent="space-between">
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
            Update Income
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="incomeAmount">Income Amount</FormLabel>
              <TextField
                autoComplete="incomeAmount"
                name="incomeAmount"
                fullWidth
                id="incomeAmount"
                placeholder="30000"
                value={incomeAmount}
                onChange={(event) => setIncomeAmount(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="incomeDate">Income Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(incomeDate)}
                  onChange={(value) => setIncomeDate(value)}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="incomeSource">Income Source</FormLabel>
              <TextField
                autoComplete="incomeSource"
                name="incomeSource"
                fullWidth
                id="incomeSource"
                placeholder="Freelancing"
                value={incomeSource}
                onChange={(event) => setIncomeSource(event.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
      </UpdateIncomeContainer>
    </AppTheme>
  );
}
