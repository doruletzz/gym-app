import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { loadToken } from "../../features/auth/slice";
import {
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_PLAN,
  ROUTE_PLANS,
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "../../utils/constants";

const Offset = styled("div")(({ theme }) => ({
  height: 90,
}));

type Setting = {
  key: string;
  role?: "member" | "developer" | "admin";
  label: string;
  to: string;
};

export const Navbar = () => {
  const { isFetching, error, token, role } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) dispatch(loadToken());
  }, []);

  const AVATAR_SRC = "/avatar.png";
  const [isSettingsMenuVisible, setIsSettingsMenuVisible] =
    useState<boolean>(false);

  const [anchorSettingsMenu, setAnchorSettingsMenu] =
    useState<HTMLElement | null>(null);

  const [isExpandMenuVisible, setIsExpandMenuVisible] =
    useState<boolean>(false);

  const [anchorExpandMenu, setAnchorExpandMenu] = useState<HTMLElement | null>(
    null
  );

  const settings: Setting[] = [
    { key: "plan", label: "Plan", to: ROUTE_PLAN },
    { key: "profile", label: "Profile", to: ROUTE_PROFILE },
    { key: "plans", role: "admin", label: "Plans", to: ROUTE_PLANS },
    { key: "logout", label: "Logout", to: ROUTE_LOGOUT },
  ];

  const expands: Setting[] = [
    { key: "login", label: "Login", to: ROUTE_LOGIN },
    { key: "register", label: "Register", to: ROUTE_REGISTER },
  ];

  const handleOpenSettingsMenu = (e: MouseEvent<HTMLElement>) => {
    setIsSettingsMenuVisible(true);
    setAnchorSettingsMenu(e.currentTarget);
  };

  const handleCloseSettingsMenu = (e: MouseEvent<HTMLElement>) => {
    setIsSettingsMenuVisible(false);
    setAnchorSettingsMenu(null);
  };

  const handleOpenExpandMenu = (e: MouseEvent<HTMLElement>) => {
    setIsExpandMenuVisible(true);
    setAnchorExpandMenu(e.currentTarget);
  };

  const handleCloseExpandMenu = (e: MouseEvent<HTMLElement>) => {
    setIsExpandMenuVisible(false);
    setAnchorExpandMenu(null);
  };

  const EXPAND_ICON_SRC = "/expand-icon.svg";
  const LOGO_SRC = "/logo.svg";

  const EXPAND_ICON = (
    <Box component="img" src={EXPAND_ICON_SRC} alt="icon" height={16} />
  );
  const LOGO = <Box component="img" src={LOGO_SRC} alt="logo" />;

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Container>
          <Toolbar disableGutters sx={{ height: 90 }}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Box
                component={Link}
                to="/"
                sx={{
                  marginY: "auto",
                  color: "inherit",
                  fill: "inherit",
                  textDecoration: "none",
                }}
              >
                <Box component="img" src={LOGO_SRC} alt="logo" width="50%" />
              </Box>

              {/* <Typography
                mr={2}
                variant="body1"
                component="a"
                href="/form"
                sx={{ textDecoration: "none", color: "inherit" }}
                >
                plan
                </Typography>
                <Typography
                mr={2}
                variant="body1"
                component="a"
                href="/form"
                sx={{ textDecoration: "none", color: "inherit" }}
                >
                plan
              </Typography> */}
              {token ? (
                <>
                  {isFetching ? (
                    <>
                      <Skeleton variant="circular">
                        <Avatar />
                      </Skeleton>
                    </>
                  ) : (
                    <Box>
                      <IconButton onClick={handleOpenSettingsMenu}>
                        <Avatar alt="avatar" src={AVATAR_SRC} />
                      </IconButton>
                      <Menu
                        open={isSettingsMenuVisible}
                        anchorEl={anchorSettingsMenu}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        onClose={handleCloseSettingsMenu}
                      >
                        {settings
                          .filter(
                            (setting) => !setting.role || setting.role === role
                          )
                          .map((setting) => (
                            <MenuItem
                              key={setting.key}
                              onClick={handleCloseSettingsMenu}
                              component={Link}
                              to={setting.to}
                            >
                              {setting.label}
                            </MenuItem>
                          ))}
                      </Menu>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <Grid
                    gap={3}
                    justifyContent="end"
                    container
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                  >
                    <Button
                      component={Link}
                      to={ROUTE_LOGIN}
                      variant="outlined"
                    >
                      login
                    </Button>
                    <Button
                      component={Link}
                      to={ROUTE_REGISTER}
                      variant="contained"
                    >
                      sign up
                    </Button>
                  </Grid>

                  <Box>
                    <IconButton
                      onClick={handleOpenExpandMenu}
                      sx={{
                        display: { xs: "flex", md: "none" },
                      }}
                    >
                      {EXPAND_ICON}
                    </IconButton>
                    <Menu
                      open={isExpandMenuVisible}
                      anchorEl={anchorExpandMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      onClose={handleCloseExpandMenu}
                    >
                      {expands.map((expand) => (
                        <MenuItem
                          key={expand.key}
                          onClick={handleCloseExpandMenu}
                          component={Link}
                          to={expand.to}
                        >
                          {expand.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
};
