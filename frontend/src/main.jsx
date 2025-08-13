import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import LandingPage from "./pages/ui/LandingPage.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import UpdateProfilePage from "./pages/user/UpdateProfilePage.jsx";
import UpdateIncomePage from "./pages/income/UpdateIncomePage.jsx";
import CreateIncomePage from "./pages/income/CreateIncomePage.jsx";
import CreateBankAccountPage from "./pages/account/CreateBankAccountPage.jsx";
import UpdateBankAccountPage from "./pages/account/UpdateBankAccountPage.jsx";
import CreateBudgetPage from "./pages/budget/CreateBudgetPage.jsx";
import CreateCategoryPage from "./pages/category/CreateCategoryPage.jsx";
import UpdateCategoryPage from "./pages/category/UpdateCategoryPage.jsx";
import CreateExpensePage from "./pages/expense/CreateExpensePage.jsx";
import UpdateExpensePage from "./pages/expense/UpdateExpensePage.jsx";
import CreateTransactionPage from "./pages/transaction/CreateTransactionPage.jsx";
import UpdateTransactionPage from "./pages/transaction/UpdateTransactionPage.jsx";
import CreateSavingPage from "./pages/saving/CreateSavingPage.jsx";
import UpdateSavingPage from "./pages/saving/UpdateSavingPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/update-profile/:id" element={<UpdateProfilePage />} />
        <Route path="/update-income/:id" element={<UpdateIncomePage />} />
        <Route path="/update-expense/:id" element={<UpdateExpensePage />} />
        <Route path="/update-saving/:id" element={<UpdateSavingPage />} />
        <Route path="/update-category/:id" element={<UpdateCategoryPage />} />
        <Route path="/update-account/:id" element={<UpdateBankAccountPage />} />
        <Route
          path="/update-transaction/:id"
          element={<UpdateTransactionPage />}
        />
        <Route path="/create-account" element={<CreateBankAccountPage />} />
        <Route path="/create-budget" element={<CreateBudgetPage />} />
        <Route path="/create-category" element={<CreateCategoryPage />} />
        <Route path="/create-expense" element={<CreateExpensePage />} />
        <Route path="/create-income" element={<CreateIncomePage />} />
        <Route path="/create-saving" element={<CreateSavingPage />} />
        <Route path="/create-transaction" element={<CreateTransactionPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
