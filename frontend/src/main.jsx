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
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import UpdateIncomePage from "./pages/UpdateIncomePage.jsx";
import CreateBankAccountPage from "./pages/CreateBankAccountPage.jsx";
import CreateBudgetPage from "./pages/CreateBudgetPage.jsx";
import CreateCategoryPage from "./pages/CreateCategoryPage.jsx";
import CreateExpensePage from "./pages/CreateExpensePage.jsx";
import CreateIncomePage from "./pages/CreateIncomePage.jsx";
import CreateTransactionPage from "./pages/CreateTransactionPage.jsx";
import UpdateExpensePage from "./pages/UpdateExpensePage.jsx";
import UpdateCategoryPage from "./pages/UpdateCategoryPage.jsx";
import UpdateBankAccountPage from "./pages/UpdateBankAccountPage.jsx";
import UpdateTransactionPage from "./pages/UpdateTransactionPage.jsx";
import CreateSavingPage from "./pages/CreateSavingPage.jsx";

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
