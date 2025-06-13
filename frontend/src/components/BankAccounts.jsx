import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserAccountsQuery } from "../redux/slices/bankAccountApiSlice";

export default function BasicTable() {
  const { data } = useGetAllUserAccountsQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Name</TableCell>
            <TableCell align="right">Account Type</TableCell>
            <TableCell align="right">Account Balance</TableCell>
            <TableCell align="right">Account Currency</TableCell>
            <TableCell align="right">Bank Name</TableCell>
            <TableCell align="right">Account Number</TableCell>
            <TableCell align="right">Active Status</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.accountsData.map((row) => (
              <TableRow
                key={row.accountId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.accountName}
                </TableCell>
                <TableCell align="right">{row.accountType}</TableCell>
                <TableCell align="right">{row.accountBalance}</TableCell>
                <TableCell align="right">{row.accountCurrency}</TableCell>
                <TableCell align="right">{row.bankName}</TableCell>
                <TableCell align="right">{row.accountNumber}</TableCell>
                <TableCell align="right">{row.isActive}</TableCell>
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
