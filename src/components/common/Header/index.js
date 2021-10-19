import { AppBar, Typography } from "@mui/material";
import React from "react";

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
