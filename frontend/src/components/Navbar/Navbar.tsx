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
  ROUTE_PROFILE,
  ROUTE_REGISTER,
} from "../../utils/constants";

const Offset = styled("div")(({ theme }) => ({
  height: 90,
}));

type Setting = {
  key: string;
  label: string;
  to: string;
};

export const Navbar = () => {
  const { isFetching, error, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) dispatch(loadToken());
  }, []);

  const AVATAR_SRC =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";

  const [isSettingsMenuVisible, setIsSettingsMenuVisible] =
    useState<boolean>(false);

  const [anchorSettingsMenu, setAnchorSettingsMenu] =
    useState<HTMLElement | null>(null);

  const settings: Setting[] = [
    { key: "plan", label: "Plan", to: ROUTE_PLAN },
    { key: "profile", label: "Profile", to: ROUTE_PROFILE },
    { key: "logout", label: "Logout", to: ROUTE_LOGOUT },
  ];

  const handleOpenSettingsMenu = (e: MouseEvent<HTMLElement>) => {
    setIsSettingsMenuVisible(true);
    setAnchorSettingsMenu(e.currentTarget);
  };

  const handleCloseSettingsMenu = (e: MouseEvent<HTMLElement>) => {
    setIsSettingsMenuVisible(false);
    setAnchorSettingsMenu(null);
  };

  const LOGO_SRC = "/logo.svg";

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
                        {settings.map((setting) => (
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
                  <IconButton
                    sx={{
                      display: { xs: "flex", md: "none" },
                    }}
                  >
                    -
                  </IconButton>
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
