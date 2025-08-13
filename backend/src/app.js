const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const accountRoutes = require("./routes/account.route");
const categoryRoutes = require("./routes/category.route");
const transactionRoutes = require("./routes/transaction.route");
const budgetRoutes = require("./routes/budget.route");
const incomeRoutes = require("./routes/income.route");
const expenseRoutes = require("./routes/expense.route");
const savingRoutes = require("./routes/saving.route");
const otpRoute = require("./routes/otp.route");
const dashboardRoute = require("./routes/dashboard.route");
const {
  notFound,
  errorHandler,
} = require("./middlewares/errorHandler.middleware");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/accounts", accountRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/incomes", incomeRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/savings", savingRoutes);
app.use("/api/v1/otp", otpRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
