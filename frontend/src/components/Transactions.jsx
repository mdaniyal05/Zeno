import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserTransactionsQuery } from "../redux/slices/transactionApiSlice";

export default function BasicTable() {
  const { data } = useGetAllUserTransactionsQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Amount</TableCell>
            <TableCell align="left">Transaction Type</TableCell>
            <TableCell align="left">Payment Method</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.transactionsData.map((row) => (
              <TableRow
                key={row.transactionId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.transactionAmount} Rs
                </TableCell>
                <TableCell align="left">{row.transactionType}</TableCell>
                <TableCell align="left">{row.paymentMethod}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.createdAt.slice(0, 10)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
