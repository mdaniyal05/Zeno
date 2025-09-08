import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import {
  useGetAllUserBudgetsQuery,
  useDeleteUserBudgetMutation,
} from "../../redux/slices/budgetApiSlice.js";
import ButtonComponent from "../ui/ButtonComponent.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Search from "../ui/Search.jsx";

export default function Budgets() {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllUserBudgetsQuery();

  const [deleteBudget] = useDeleteUserBudgetMutation();

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
        <ButtonComponent link={`/create-budget`} text={"Create Budget"} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="budgets">
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
              data.budgetsData
                .filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.startDate.toLowerCase().includes(search) ||
                      item.endDate.toLowerCase().includes(search) ||
                      item.description.toLowerCase().includes(search)
                )
                .map((row) => (
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
                          "Are you sure you want to delete this budget? All your tracked data for this budget will be lost."
                        }
                        title={"Confirmation"}
                        mutation={() =>
                          deleteBudget(row.budgetId).then(
                            toast.success("Budget deleted successfully.")
                          )
                        }
                      />
                      <Link to={`/update-budget/${row.budgetId}`}>
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
