import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ButtonComponent = ({ link = "", text, type = "button" }) => {
  return (
    <>
      <Link to={link}>
        <Button type={type} variant="contained">
          {text}
        </Button>
      </Link>
    </>
  );
};

export default ButtonComponent;
