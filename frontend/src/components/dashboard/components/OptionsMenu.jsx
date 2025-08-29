import * as React from "react";
import { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import { useLogoutMutation } from "../../../redux/slices/authApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDeleteProfileMutation } from "../../../redux/slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlertDialog from "../../ui/AlertDialog";

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <Stack
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Stack>
        <Stack
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <AlertDialog
            icon={<DeleteIcon />}
            title={"Confirmation"}
            contentText={
              "Are you sure you want to delete your profile? All your data will be lost."
            }
            mutation={() =>
              deleteProfile().then(
                navigate("/").then(
                  toast.success(
                    "Profile deleted successfully. Sad to see your leave."
                  )
                )
              )
            }
            changeIconType={true}
            buttonText={"Delete Profile"}
          />
        </Stack>
      </Menu>
    </React.Fragment>
  );
}
