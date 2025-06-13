import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserCategoriesQuery } from "../redux/slices/categoryApiSlice";

export default function BasicTable() {
  const { data } = useGetAllUserCategoriesQuery();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell align="right">Category Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Active Status</TableCell>
            <TableCell align="right">Monthly Limit</TableCell>
            <TableCell align="right">Monthly Limit Remaining Amount</TableCell>
            <TableCell align="right">Monthl Limit Exceeded Status</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.categoriesData.map((row) => (
              <TableRow
                key={row.categoryId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.categoryName}
                </TableCell>
                <TableCell align="right">{row.categoryType}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.isActive}</TableCell>
                <TableCell align="right">{row.monthlyLimit}</TableCell>
                <TableCell align="right">
                  {row.monthlyLimitRemainingAmount}
                </TableCell>
                <TableCell align="right">
                  {row.isMonthlyLimitExceeded === false
                    ? "Not Exceeded"
                    : "Exceeded"}
                </TableCell>
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
