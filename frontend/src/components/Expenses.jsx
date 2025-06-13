import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserExpensesQuery } from "../redux/slices/expenseApiSlice";

export default function BasicTable() {
  const { data } = useGetAllUserExpensesQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Expense Amount</TableCell>
            <TableCell align="right">Expense Type</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Expense Date</TableCell>
            <TableCell align="right">Merchant</TableCell>
            <TableCell align="right">Created At</TableCell>
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
                <TableCell align="right">{row.expenseType}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">{row.expenseDate}</TableCell>
                <TableCell align="right">{row.merchant}</TableCell>
                <TableCell align="right">
                  {row.createdAt.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
