import Box from "@mui/material/Box";
import Home from "../../dashboard/Home";
import Profile from "../../user/Profile";
import BankAccounts from "../../account/BankAccounts";
import Categories from "../../category/Categories";
import Incomes from "../../income/Incomes";
import Expenses from "../../expense/Expenses";
import Transactions from "../../transaction/Transactions";
import Budgets from "../../budget/Budgets";
import Savings from "../../saving/Savings";

export default function MainGrid({ activeItem }) {
  const renderContent = () => {
    switch (activeItem) {
      case "Home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "Bank Accounts":
        return <BankAccounts />;
      case "Categories":
        return <Categories />;
      case "Incomes":
        return <Incomes />;
      case "Expenses":
        return <Expenses />;
      case "Transactions":
        return <Transactions />;
      case "Budgets":
        return <Budgets />;
      case "Savings":
        return <Savings />;
      default:
        return <div>Please select an item from the menu</div>;
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {renderContent()}
    </Box>
  );
}
