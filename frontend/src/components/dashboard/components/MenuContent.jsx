import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoneyIcon from "@mui/icons-material/Money";
import FaceIcon from "@mui/icons-material/Face";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  { text: "Profile", icon: <FaceIcon /> },
  { text: "Bank Accounts", icon: <AccountBalanceIcon /> },
  { text: "Categories", icon: <CategoryIcon /> },
  { text: "Incomes", icon: <PaidIcon /> },
  { text: "Expenses", icon: <PaymentsIcon /> },
  { text: "Transactions", icon: <ReceiptIcon /> },
  { text: "Budgets", icon: <MoneyIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
