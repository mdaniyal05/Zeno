import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import {
  useGetAllUserExpensesQuery,
  useDeleteUserExpenseMutation,
} from "../redux/slices/expenseApiSlice";
import ButtonComponent from "../components/ButtonComponent";
import AlertDialog from "./AlertDialog.jsx";

export default function BasicTable() {
  const { data } = useGetAllUserExpensesQuery();

  const [deleteExpense] = useDeleteUserExpenseMutation();

  return (
    <>
      <div style={{ textAlign: "end", margin: "1rem" }}>
        <ButtonComponent link={`/create-expense`} text={"Create Expense"} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              data.expensesData.map((row) => (
                <TableRow
                  key={row.expenseId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.expenseAmount} Rs
                  </TableCell>
                  <TableCell align="left">{row.expenseType}</TableCell>
                  <TableCell align="left">{row.expenseDate}</TableCell>
                  <TableCell align="left">{row.merchant}</TableCell>
                  <TableCell align="left">
                    {row.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell align="left">
                    <AlertDialog
                      icon={<DeleteIcon />}
                      contentText={
                        "Are you sure you want to delete this expense?"
                      }
                      title={"Confirmation"}
                      mutation={() => deleteExpense(row.expenseId)}
                    />
                    <Link to={`/update-expense/${row.expenseId}`}>
                      <IconButton sx={{ ml: 1 }}>
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
