import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import {
  useGetAllUserBudgetsQuery,
  useDeleteUserBudgetMutation,
} from "../redux/slices/budgetApiSlice";
import ButtonComponent from "../components/ButtonComponent";
import AlertDialog from "./AlertDialog.jsx";

export default function BasicTable() {
  const { data } = useGetAllUserBudgetsQuery();

  const [deleteBudget] = useDeleteUserBudgetMutation();

  return (
    <>
      <div style={{ textAlign: "end", margin: "1rem" }}>
        <ButtonComponent link={`/create-budget`} text={"Create Budget"} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Budget Amount</TableCell>
              <TableCell align="left">Amount Spent</TableCell>
              <TableCell align="left">Amount Remaining</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.budgetsData.map((row) => (
                <TableRow
                  key={row.budgetId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.startDate}
                  </TableCell>
                  <TableCell align="left">{row.endDate}</TableCell>
                  <TableCell align="left">{row.budgetAmount}</TableCell>
                  <TableCell align="left">{row.amountSpent}</TableCell>
                  <TableCell align="left">{row.amountRemaining}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                    {row.createdAt.slice(0, 10)}
                  </TableCell>
                  <TableCell align="left">
                    <AlertDialog
                      icon={<DeleteIcon />}
                      contentText={
                        "Are you sure you want to delete this budget?"
                      }
                      title={"Confirmation"}
                      mutation={() => deleteBudget(row.budgetId)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
