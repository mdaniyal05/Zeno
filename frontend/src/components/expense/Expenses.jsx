import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import {
  useGetAllUserExpensesQuery,
  useDeleteUserExpenseMutation,
} from "../../redux/slices/expenseApiSlice.js";
import ButtonComponent from "../ui/ButtonComponent.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import { toast } from "react-toastify";
import Search from "../ui/Search.jsx";

export default function Expenses() {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllUserExpensesQuery();

  const [deleteExpense] = useDeleteUserExpenseMutation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        <Search setOnChange={setSearch} />
        <ButtonComponent link={`/create-expense`} text={"Create Expense"} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="expenses">
          <TableHead>
            <TableRow>
              <TableCell>Expense Amount</TableCell>
              <TableCell align="left">Expense Type</TableCell>
              <TableCell align="left">Expense Date</TableCell>
              <TableCell align="left">Merchant</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.expensesData
                .filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.expenseType.toLowerCase().includes(search) ||
                      item.expenseDate.toLowerCase().includes(search) ||
                      item.merchant.toLowerCase().includes(search)
                )
                .map((row) => (
                  <TableRow
                    key={row.expenseId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.expenseAmount}
                    </TableCell>
                    <TableCell align="left">{row.expenseType}</TableCell>
                    <TableCell align="left">{row.expenseDate}</TableCell>
                    <TableCell align="left">{row.merchant}</TableCell>
                    <TableCell align="left">
                      {row.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <AlertDialog
                        icon={<DeleteIcon />}
                        contentText={
                          "Are you sure you want to delete this expense? All your tracked data for this expense will be lost."
                        }
                        title={"Confirmation"}
                        mutation={() =>
                          deleteExpense(row.expenseId).then(
                            toast.success("Expense deleted successfully.")
                          )
                        }
                      />
                      <Link to={`/update-expense/${row.expenseId}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
