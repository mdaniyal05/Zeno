import Box from "@mui/material/Box";
import Home from "../../Home";
import Profile from "../../Profile";
import BankAccounts from "../../BankAccounts";
import Categories from "../../Categories";
import Incomes from "../../Incomes";
import Expenses from "../../Expenses";
import Transactions from "../../Transactions";
import Budgets from "../../Budgets";

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
