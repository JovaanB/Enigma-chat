import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
        </Grid>
    );
};

export default SendInput;
