import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetAllUserIncomesQuery,
  useDeleteUserIncomeMutation,
} from "../redux/slices/incomeApiSlice.js";
import ButtonComponent from "../components/ButtonComponent";

export default function BasicTable() {
  const { data } = useGetAllUserIncomesQuery();

  const [deleteIncome] = useDeleteUserIncomeMutation();

  const deleteIncomeHandler = async (event) => {
    event.preventDefault();

    try {
      if (data) {
        await deleteIncome().unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "end", margin: "1rem" }}>
        <ButtonComponent link={`/create-income`} text={"Create Income"} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Income Amount</TableCell>
              <TableCell align="left">Currency</TableCell>
              <TableCell align="left">Income Date</TableCell>
              <TableCell align="left">Income Source</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Options</TableCell>
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
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      sx={{ mr: 1 }}
                      onClick={deleteIncomeHandler}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
