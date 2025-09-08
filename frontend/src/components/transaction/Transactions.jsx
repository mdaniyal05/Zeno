import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetAllUserTransactionsQuery,
  useDeleteUserTransactionMutation,
} from "../../redux/slices/transactionApiSlice.js";
import ButtonComponent from "../ui/ButtonComponent.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import { toast } from "react-toastify";
import Search from "../ui/Search.jsx";

export default function Transactions() {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllUserTransactionsQuery();

  const [deleteTransaction] = useDeleteUserTransactionMutation();

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
        <ButtonComponent
          link={`/create-transaction`}
          text={"Create Transaction"}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="transactions">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Amount</TableCell>
              <TableCell align="left">Transaction Type</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.transactionsData
                .filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.transactionType.toLowerCase().includes(search) ||
                      item.paymentMethod.toLowerCase().includes(search) ||
                      item.description.toLowerCase().includes(search)
                )
                .map((row) => (
                  <TableRow
                    key={row.transactionId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.transactionAmount}
                    </TableCell>
                    <TableCell align="left">{row.transactionType}</TableCell>
                    <TableCell align="left">{row.paymentMethod}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
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
                          "Are you sure you want to delete this transaction? All your tracked data for this transaction will be lost."
                        }
                        title={"Confirmation"}
                        mutation={() =>
                          deleteTransaction(row.transactionId).then(
                            toast.success("Transaction deleted successfully.")
                          )
                        }
                      />
                      <Link to={`/update-transaction/${row.transactionId}`}>
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
