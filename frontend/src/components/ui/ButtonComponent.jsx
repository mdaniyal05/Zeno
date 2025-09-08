import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ButtonComponent = ({ link = "", text, type = "button" }) => {
  return (
    <>
      <Link to={link}>
        <Button
          type={type}
          variant="outlined"
          size="large"
          sx={{ height: "2.5rem", width: "12rem" }}
        >
          {text}
        </Button>
      </Link>
    </>
  );
};

export default ButtonComponent;
