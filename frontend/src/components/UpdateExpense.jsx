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
import AppTheme from "./shared-theme/AppTheme";
import ColorModeSelect from "./shared-theme/ColorModeSelect";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserExpenseQuery,
  useUpdateUserExpenseMutation,
} from "../redux/slices/expenseApiSlice";
import { toast } from "react-toastify";
import { useGetAllUserCategoriesQuery } from "../redux/slices/categoryApiSlice";

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

const UpdateExpenseContainer = styled(Stack)(({ theme }) => ({
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

export default function UpdateExpense(props) {
  const { id } = useParams();
  const { data: expenseData } = useGetUserExpenseQuery(id);
  const { data: categoryData } = useGetAllUserCategoriesQuery();

  const [expenseAmount, setExpenseAmount] = React.useState("");
  const [expenseType, setExpenseType] = React.useState("");
  const [expenseDate, setExpenseDate] = React.useState(null);
  const [categoryId, setCategoryId] = React.useState("");
  const [merchant, setMerchant] = React.useState("");

  const navigate = useNavigate();

  const [updateExpense] = useUpdateUserExpenseMutation();

  React.useEffect(() => {
    setExpenseAmount((expenseData && expenseData.expenseAmount) || "");
    setExpenseType((expenseData && expenseData.expenseType) || "");
    setExpenseDate((expenseData && expenseData.expenseDate) || "");
    setCategoryId((expenseData && expenseData.categoryId) || "");
    setMerchant((expenseData && expenseData.merchant) || "");
  }, [expenseData]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await updateExpense({
        id: id,
        expenseAmount,
        expenseType,
        expenseDate,
        merchant,
        categoryId,
      }).unwrap();
      navigate("/home");
      toast.success("Expense updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <UpdateExpenseContainer direction="column" justifyContent="space-between">
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
            Update Expense
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="amount">Expense Amount</FormLabel>
              <TextField
                name="amount"
                required
                fullWidth
                id="amount"
                placeholder="35000"
                value={expenseAmount}
                onChange={(event) => setExpenseAmount(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="expenseType">Expense Type</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="expenseType"
                    id="expenseType"
                    label="Expense Type"
                    value={expenseType}
                    onChange={(event) => setExpenseType(event.target.value)}
                  >
                    <MenuItem value={"Needs"}>Needs</MenuItem>
                    <MenuItem value={"Wants"}>Wants</MenuItem>
                    <MenuItem value={"Savings"}>Savings</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="category"
                    id="category"
                    label="Category"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                  >
                    {categoryData &&
                      categoryData.categoriesData.map((category) => (
                        <MenuItem value={category.categoryId}>
                          {category.categoryName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="expenseDate">Expense Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(expenseDate)}
                  onChange={(value) => setExpenseDate(value)}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="merchant">Merchant</FormLabel>
              <TextField
                required
                fullWidth
                id="merchant"
                placeholder="Shopping"
                name="merchant"
                variant="outlined"
                value={merchant}
                onChange={(event) => setMerchant(event.target.value)}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Update
            </Button>
          </Box>
        </Card>
      </UpdateExpenseContainer>
    </AppTheme>
  );
}
