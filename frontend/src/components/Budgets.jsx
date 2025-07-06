import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserBudgetsQuery } from "../redux/slices/budgetApiSlice";
import ButtonComponent from "../components/ButtonComponent";

export default function BasicTable() {
  const { data } = useGetAllUserBudgetsQuery();

  return (
    <>
      <div style={{ textAlign: "end", margin: "1rem" }}>
        <ButtonComponent link={`/create-budget`} text={"Create Budget"} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Budget Amount</TableCell>
              <TableCell align="left">Budget Period</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Amount Spent</TableCell>
              <TableCell align="left">Amount Remaining</TableCell>
              <TableCell align="left">Percent Used</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.budgetsData.map((row) => (
                <TableRow
                  key={row.budgetId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.budgetAmount} Rs
                  </TableCell>
                  <TableCell align="left">{row.budgetPeriod}</TableCell>
                  <TableCell align="left">{row.startDate}</TableCell>
                  <TableCell align="left">{row.endDate}</TableCell>
                  <TableCell align="left">{row.amountSpent}</TableCell>
                  <TableCell align="left">{row.amountRemaining}</TableCell>
                  <TableCell align="left">{row.percentUsed} %</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                    {row.createdAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
