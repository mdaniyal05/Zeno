import * as React from "react";
import { styled } from "@mui/material/styles";
import { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
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

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const deletProfileHandler = async () => {
    try {
      await deleteProfile();
      navigate("/");
      toast.success(
        "Profile deleted successfully. We are sad to see you leave."
      );
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

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
        onClick={handleClose}
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
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: "auto",
              minWidth: 0,
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
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<DeleteIcon />}
              onClick={deletProfileHandler}
            >
              Delete Profile
            </Button>
          </Stack>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
