import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

const SendInput = ({ setMessage, message, sendMessage }) => {
    return (
        <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
                <TextField
                    id="outlined-basic-email"
                    label="Votre message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    // prettier-ignore
                    onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
                    fullWidth
                />
            </Grid>
            {/* <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                    <SendIcon />
                </Fab>
            </Grid> */}
        </Grid>
    );
};

export default SendInput;
