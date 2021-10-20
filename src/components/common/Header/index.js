import React from "react";
import { AppBar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static">
            <Typography marginX={2} marginY={1} variant="h5">
                ENIGMA CHAT
            </Typography>
        </AppBar>
    );
};

export default Header;
