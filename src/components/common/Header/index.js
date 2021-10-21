import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";
import { Button, Box } from "@material-ui/core";

const Header = ({ isChat }) => {
    const history = useHistory();

    return (
        <AppBar position="static">
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                <Typography marginX={3} marginY={1} variant="h5">
                    ENIGMA CHAT
                </Typography>
                {isChat && (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            history.push("/video");
                        }}
                        variant="contained"
                        color="secondary"
                    >
                        Video
                    </Button>
                )}
            </Box>
        </AppBar>
    );
};

export default Header;
