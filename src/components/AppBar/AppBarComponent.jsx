import * as React from 'react';
import {
    IconButton,
    Typography,
    Toolbar,
    Box,
    AppBar,
    List,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';

import CloseIcon from '@mui/icons-material/Close';
import { styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';

import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter
} from "react-router-dom";

export const AppBarComponent = () => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const drawerWidth = 230;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const theme = useTheme();

    const drawer = (
        <List>
            <ListItemButton component={RouterLink} to={`crearProducto/`}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Nuevo Producto" />
            </ListItemButton>
            <Divider />
            <ListItemButton component={RouterLink} to={`listaProductos/`}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Productos" />
            </ListItemButton>
        </List>
    )
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent' elevation={0}>
                <Toolbar>

                    {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setMobileOpen(true)}
                        edge="start"
                        sx={{ mr: 3, ...(mobileOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        CORPORACION CEDEÑO VELOZ
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                elevation={6}
                sx={{
                    width: { xs: 0, lg: drawerWidth },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setMobileOpen(false)}>
                        {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
                    </IconButton>
                </DrawerHeader>
                {drawer}
            </Drawer>
        </Box>
    );
}