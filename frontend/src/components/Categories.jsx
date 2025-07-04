import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetAllUserCategoriesQuery } from "../redux/slices/categoryApiSlice";
import ButtonComponent from "../components/ButtonComponent";

export default function BasicTable() {
  const { data } = useGetAllUserCategoriesQuery();

  return (
    <>
      <div style={{ textAlign: "end", margin: "1rem" }}>
        <ButtonComponent link={``} text={"Create Category"} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell align="left">Category Type</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Active Status</TableCell>
              <TableCell align="left">Monthly Limit</TableCell>
              <TableCell align="left">Monthly Limit Remaining Amount</TableCell>
              <TableCell align="left">Monthl Limit Exceeded Status</TableCell>
              <TableCell align="left">Created At</TableCell>
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
                  <TableCell align="left">{row.categoryType}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    {row.isActive === false ? "Not Active" : "Active"}
                  </TableCell>
                  <TableCell align="left">{row.monthlyLimit}</TableCell>
                  <TableCell align="left">
                    {row.monthlyLimitRemainingAmount}
                  </TableCell>
                  <TableCell align="left">
                    {row.isMonthlyLimitExceeded === false
                      ? "Not Exceeded"
                      : "Exceeded"}
                  </TableCell>
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
