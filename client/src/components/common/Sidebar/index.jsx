import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutline,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import profileImage from "assets/profile.jpg";

const navItems = [
  {
    name: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    name: "Client Facing",
    icon: null,
  },
  {
    name: "products",
    icon: <ShoppingCartOutlined />,
  },
  {
    name: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    name: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    name: "Geography",
    icon: <PublicOutlined />,
  },
  {
    name: "Sales",
    icon: null,
  },
  {
    name: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    name: "Daily",
    icon: <TodayOutlined />,
  },
  {
    name: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    name: "BreakDown",
    icon: <PieChartOutline />,
  },
  {
    name: "Management",
    icon: null,
  },
  {
    name: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    name: "Performances",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}) => {
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ name, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={name} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {name}
                    </Typography>
                  );
                }
                const lcName = name.toLowerCase();
                return (
                  <ListItem key={name} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcName}`);
                        setActive(lcName);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcName
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcName
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcName
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                      {active === lcName && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>

                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
