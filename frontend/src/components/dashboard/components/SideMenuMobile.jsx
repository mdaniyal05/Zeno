import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuContent from "./MenuContent";
import { useLogoutMutation } from "../../../redux/slices/authApiSlice";
import { useDeleteProfileMutation } from "../../../redux/slices/userApiSlice";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlertDialog from "../../ui/AlertDialog";

function SideMenuMobile({ open, toggleDrawer, onMenuItemClick, activeItem }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

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

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={userInfo.fullName}
              sx={{ width: 25, height: 25 }}
            />
            <Typography component="p" variant="h6">
              {userInfo.fullName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent
            onMenuItemClick={onMenuItemClick}
            activeItem={activeItem}
          />
          <Divider />
        </Stack>
        <Stack
          sx={{
            p: 2,
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
                    "Profile deleted successfully. Sad to see you leave."
                  )
                )
              )
            }
            changeIconType={true}
            buttonText={"Delete Profile"}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
