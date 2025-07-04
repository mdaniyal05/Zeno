import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ButtonComponent = ({ link, text }) => {
  return (
    <>
      <Link to={link}>
        <Button type="button" variant="contained">
          {text}
        </Button>
      </Link>
    </>
  );
};

export default ButtonComponent;
