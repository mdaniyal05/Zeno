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
  useGetAllUserSavingsQuery,
  useDeleteUserSavingMutation,
} from "../../redux/slices/savingApiSlice.js";
import ButtonComponent from "../ui/ButtonComponent.jsx";
import AlertDialog from "../ui/AlertDialog.jsx";
import { toast } from "react-toastify";
import Search from "../ui/Search.jsx";

export default function Savings() {
  const [search, setSearch] = React.useState("");

  const { data } = useGetAllUserSavingsQuery();

  const [deleteSaving] = useDeleteUserSavingMutation();

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
        <ButtonComponent link={`/create-saving`} text={"Create Saving"} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="savings">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Target Amount</TableCell>
              <TableCell align="left">Current Amount</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.savingsData
                .filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(search) ||
                      item.description.toLowerCase().includes(search)
                )
                .map((row) => (
                  <TableRow
                    key={row.savingId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.targetAmount}</TableCell>
                    <TableCell align="left">{row.currentAmount}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      {row.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell align="left">
                      <AlertDialog
                        icon={<DeleteIcon />}
                        contentText={
                          "Are you sure you want to delete this saving? All your tracked data for this saving will be lost."
                        }
                        title={"Confirmation"}
                        mutation={() =>
                          deleteSaving(row.savingId).then(
                            toast.success("Saving deleted successfully.")
                          )
                        }
                      />
                      <Link to={`/update-saving/${row.savingId}`}>
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
