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
const { notFound, errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
