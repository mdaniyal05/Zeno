import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserIncomesQuery } from "../redux/slices/incomeApiSlice.js";

export default function BasicTable() {
  const { data } = useGetAllUserIncomesQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Income Amount</TableCell>
            <TableCell align="left">Currency</TableCell>
            <TableCell align="left">Income Date</TableCell>
            <TableCell align="left">Income Source</TableCell>
            <TableCell align="left">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.incomesData.map((row) => (
              <TableRow
                key={row.incomeId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.incomeAmount} Rs
                </TableCell>
                <TableCell align="left">{row.currency}</TableCell>
                <TableCell align="left">{row.incomeDate}</TableCell>
                <TableCell align="left">{row.incomeSource}</TableCell>
                <TableCell align="left">
                  {row.createdAt.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
