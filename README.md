# 💰 Zeno Finance Tracker

A full-stack personal finance management application that helps individuals stay in control of their money.
Track income, expenses, savings, budgets, and categories — all visualized through a dashboard with charts.

## 🚀 Features

- 🔐 Authentication & Authorization – Secure register and login using JWT access and refresh tokens (HTTP-only cookies)
- 🔐 OTP Email Verification – Secure email verification using OTP system
- 🏦 Bank Accounts Management – Create real or virtual accounts for tracking
- 💸 Expense Tracking – Categorize expenses with limits to avoid overspending
- 💰 Income Tracking – Record multiple sources of income
- 📊 Dashboard & Charts – Visual representation of financial health
- 🎯 Budgets – One active budget at a time with start/end dates
- 💵 Savings Accounts – Track progress toward savings goals
- ✉️ Email Reminders – Notifications via Nodemailer
- 🔍 Search & Filter – Easily navigate stored financial records

## 🛠️ Tech Stack

### Frontend

- ⚛️ React (with Vite)
- 🎨 Material UI (MUI)
- 📅 Day.js
- 📈 MUI X Charts, Data Grid
- 🔄 Redux Toolkit
- 🌐 React Router v7

### Backend

- 🟢 Node.js, Express.js
- 🐘 PostgreSQL with Sequelize ORM
- 🔑 JWT (with HTTP-only cookies)
- 📧 Nodemailer
- 🔐 bcryptjs for password hashing

### Dev Tools

Nodemon, ESLint, Prettier, PgAdmin, Postman

## ⚡ Getting Started

### 1️⃣ Clone the repo
```
https://github.com/[username]/Zeno.git
cd Zeno
```

### 2️⃣ Backend Setup
```
cd backend
npm install
```
Create a .env file based on .env.example:
```
PORT=<server-port>
NODE_ENV=<development>
DB_HOST=<localhost>
DB_PORT=<DB-port>
DB_USER=<DB-username>
DB_PASS=<DB-password>
DB_NAME=<DB-name>
ACCESS_TOKEN_SECRET=<access-token-secret>
REFRESH_TOKEN_SECRET=<refresh-token-secret>
ACCESS_TOKEN_EXPIRY=<expiry-time>
REFRESH_TOKEN_EXPIRY=<expiry-time>
MAIL_HOST=<email-host>
MAIL_USER=<email-address>
MAIL_PASS=<email-app-password>
FROM_MAIL=<sending-email-from>
```
Start backend:
```
npm run dev
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

## 📊 Database

PostgreSQL managed with Sequelize ORM. You can manage your database visually with PgAdmin. Supports models for:

- User
- Transaction
- Saving
- OTP
- Income
- Expense
- Category
- Budget
- Account

## 📂 Project Structure

```
📂 Zeno
├─ README.md
├─ backend
│  ├─ .env.sample
│  ├─ .gitignore
│  ├─ .prettierignore
│  ├─ .prettierrc
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ app.js
│     ├─ controllers
│     │  ├─ account.controller.js
│     │  ├─ auth.controller.js
│     │  ├─ budget.controller.js
│     │  ├─ category.controller.js
│     │  ├─ dashboard.controller.js
│     │  ├─ expense.controller.js
│     │  ├─ income.controller.js
│     │  ├─ otp.controller.js
│     │  ├─ saving.controller.js
│     │  ├─ transaction.controller.js
│     │  └─ user.controller.js
│     ├─ db
│     │  ├─ db.js
│     │  └─ syncModels.js
│     ├─ html
│     │  ├─ notifyUser.html
│     │  └─ otpVerification.html
│     ├─ index.js
│     ├─ middlewares
│     │  ├─ auth.middleware.js
│     │  └─ errorHandler.middleware.js
│     ├─ models
│     │  ├─ account.model.js
│     │  ├─ budget.model.js
│     │  ├─ category.model.js
│     │  ├─ expense.model.js
│     │  ├─ income.model.js
│     │  ├─ otp.model.js
│     │  ├─ saving.model.js
│     │  ├─ transaction.model.js
│     │  └─ user.model.js
│     ├─ routes
│     │  ├─ account.route.js
│     │  ├─ auth.route.js
│     │  ├─ budget.route.js
│     │  ├─ category.route.js
│     │  ├─ dashboard.route.js
│     │  ├─ expense.route.js
│     │  ├─ income.route.js
│     │  ├─ otp.route.js
│     │  ├─ saving.route.js
│     │  ├─ transaction.route.js
│     │  └─ user.route.js
│     ├─ sql
│     │  └─ personalFinanceTracker.sql
│     └─ utils
│        ├─ generateJwtToken.js
│        ├─ generateOtp.js
│        ├─ mailSender.js
│        ├─ notifyEmail.js
│        └─ verificationEmail.js
└─ frontend
   ├─ .gitignore
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ App.jsx
   │  ├─ components
   │  │  ├─ account
   │  │  │  ├─ BankAccounts.jsx
   │  │  │  ├─ CreateBankAccount.jsx
   │  │  │  └─ UpdateBankAccount.jsx
   │  │  ├─ auth
   │  │  │  ├─ PrivateRoute.jsx
   │  │  │  ├─ SignIn.jsx
   │  │  │  └─ SignUp.jsx
   │  │  ├─ budget
   │  │  │  ├─ Budgets.jsx
   │  │  │  ├─ CreateBudget.jsx
   │  │  │  └─ UpdateBudget.jsx
   │  │  ├─ category
   │  │  │  ├─ Categories.jsx
   │  │  │  ├─ CreateCategory.jsx
   │  │  │  └─ UpdateCategory.jsx
   │  │  ├─ dashboard
   │  │  │  ├─ Dashboard.jsx
   │  │  │  ├─ Home.jsx
   │  │  │  └─ components
   │  │  │     ├─ ActiveBudgetPieChart.jsx
   │  │  │     ├─ AppNavbar.jsx
   │  │  │     ├─ Header.jsx
   │  │  │     ├─ IncomeExpenseSavingBarChart.jsx
   │  │  │     ├─ IncomeExpenseSavingLineChart.jsx
   │  │  │     ├─ MainGrid.jsx
   │  │  │     ├─ MenuButton.jsx
   │  │  │     ├─ MenuContent.jsx
   │  │  │     ├─ MetricCard.jsx
   │  │  │     ├─ NavbarBreadcrumbs.jsx
   │  │  │     ├─ OptionsMenu.jsx
   │  │  │     ├─ PageViewsBarChart.jsx
   │  │  │     ├─ SideMenu.jsx
   │  │  │     ├─ SideMenuMobile.jsx
   │  │  │     └─ TotalIncomeExpenseSavingPieChart.jsx
   │  │  ├─ expense
   │  │  │  ├─ CreateExpense.jsx
   │  │  │  ├─ Expenses.jsx
   │  │  │  └─ UpdateExpense.jsx
   │  │  ├─ income
   │  │  │  ├─ CreateIncome.jsx
   │  │  │  ├─ Incomes.jsx
   │  │  │  └─ UpdateIncome.jsx
   │  │  ├─ saving
   │  │  │  ├─ CreateSaving.jsx
   │  │  │  ├─ Savings.jsx
   │  │  │  └─ UpdateSaving.jsx
   │  │  ├─ shared-theme
   │  │  │  ├─ AppTheme.jsx
   │  │  │  ├─ ColorModeIconDropdown.jsx
   │  │  │  ├─ ColorModeSelect.jsx
   │  │  │  ├─ customizations
   │  │  │  │  ├─ dataDisplay.jsx
   │  │  │  │  ├─ feedback.jsx
   │  │  │  │  ├─ inputs.jsx
   │  │  │  │  ├─ navigation.jsx
   │  │  │  │  └─ surfaces.jsx
   │  │  │  └─ themePrimitives.jsx
   │  │  ├─ transaction
   │  │  │  ├─ CreateTransaction.jsx
   │  │  │  ├─ Transactions.jsx
   │  │  │  └─ UpdateTransaction.jsx
   │  │  ├─ ui
   │  │  │  ├─ AlertDialog.jsx
   │  │  │  ├─ ButtonComponent.jsx
   │  │  │  ├─ Hero.jsx
   │  │  │  ├─ NavBar.jsx
   │  │  │  └─ Search.jsx
   │  │  └─ user
   │  │     ├─ Profile.jsx
   │  │     └─ UpdateProfile.jsx
   │  ├─ index.css
   │  ├─ main.jsx
   │  ├─ pages
   │  │  ├─ account
   │  │  │  ├─ CreateBankAccountPage.jsx
   │  │  │  └─ UpdateBankAccountPage.jsx
   │  │  ├─ auth
   │  │  │  ├─ SignInPage.jsx
   │  │  │  └─ SignUpPage.jsx
   │  │  ├─ budget
   │  │  │  ├─ CreateBudgetPage.jsx
   │  │  │  └─ UpdateBudgetPage.jsx
   │  │  ├─ category
   │  │  │  ├─ CreateCategoryPage.jsx
   │  │  │  └─ UpdateCategoryPage.jsx
   │  │  ├─ dashboard
   │  │  │  └─ HomePage.jsx
   │  │  ├─ expense
   │  │  │  ├─ CreateExpensePage.jsx
   │  │  │  └─ UpdateExpensePage.jsx
   │  │  ├─ income
   │  │  │  ├─ CreateIncomePage.jsx
   │  │  │  └─ UpdateIncomePage.jsx
   │  │  ├─ saving
   │  │  │  ├─ CreateSavingPage.jsx
   │  │  │  └─ UpdateSavingPage.jsx
   │  │  ├─ transaction
   │  │  │  ├─ CreateTransactionPage.jsx
   │  │  │  └─ UpdateTransactionPage.jsx
   │  │  ├─ ui
   │  │  │  └─ LandingPage.jsx
   │  │  └─ user
   │  │     └─ UpdateProfilePage.jsx
   │  └─ redux
   │     ├─ slices
   │     │  ├─ apiSlice.js
   │     │  ├─ authApiSlice.js
   │     │  ├─ authSlice.js
   │     │  ├─ bankAccountApiSlice.js
   │     │  ├─ baseQueryWithReauth.js
   │     │  ├─ budgetApiSlice.js
   │     │  ├─ categoryApiSlice.js
   │     │  ├─ dashboardApiSlice.js
   │     │  ├─ expenseApiSlice.js
   │     │  ├─ incomeApiSlice.js
   │     │  ├─ otpApiSlice.js
   │     │  ├─ savingApiSlice.js
   │     │  ├─ transactionApiSlice.js
   │     │  └─ userApiSlice.js
   │     └─ store.js
   └─ vite.config.js
```
