import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import {
  useGetAllUserIncomesQuery,
  useDeleteUserIncomeMutation,
} from "../../redux/slices/incomeApiSlice.js";
import ButtonComponent from "../ui/ButtonComponent.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import { toast } from "react-toastify";
import Search from "../ui/Search.jsx";

export default function Incomes() {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllUserIncomesQuery();

  const [deleteIncome] = useDeleteUserIncomeMutation();

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
        <ButtonComponent link={`/create-income`} text={"Create Income"} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="incomes">
          <TableHead>
            <TableRow>
              <TableCell>Income Amount</TableCell>
              <TableCell align="left">Income Date</TableCell>
              <TableCell align="left">Income Source</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.incomesData
                .filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.incomeDate.toLowerCase().includes(search) ||
                      item.incomeSource.toLowerCase().includes(search)
                )
                .map((row) => (
                  <TableRow
                    key={row.incomeId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.incomeAmount}
                    </TableCell>
                    <TableCell align="left">{row.incomeDate}</TableCell>
                    <TableCell align="left">{row.incomeSource}</TableCell>
                    <TableCell align="left">
                      {row.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell align="left">
                      <AlertDialog
                        icon={<DeleteIcon />}
                        contentText={
                          "Are you sure you want to delete this income?"
                        }
                        title={"Confirmation"}
                        mutation={() =>
                          deleteIncome(row.incomeId).then(
                            toast.success("Income deleted successfully.")
                          )
                        }
                      />
                      <Link to={`/update-income/${row.incomeId}`}>
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
