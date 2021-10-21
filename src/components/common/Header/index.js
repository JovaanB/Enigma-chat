import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = ({ isChat }) => {
    const history = useHistory();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" padding={3}>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <Typography marginX={3} marginY={1} variant="h5">
                        ENIGMA CHAT
                    </Typography>
                    {isChat && (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                history.push("/video");
                                window.location.reload();
                            }}
                            variant="contained"
                            color="secondary"
                        >
                            Video
                        </Button>
                    )}
                </Box>
            </AppBar>
        </Box>
    );
};

export default Header;
