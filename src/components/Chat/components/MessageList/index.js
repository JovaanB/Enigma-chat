import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
    messageArea: {
        height: "78vh",
        overflowY: "auto",
    },
    messageContainer: {
        padding: "8px",
        margin: "0px 10px",
        borderRadius: "15px",
        textDecoration: "underline",
    },
});
const MessageList = ({ messages, user }) => {
    const classes = useStyles();

    return (
        <ScrollToBottom>
            <List className={classes.messageArea}>
                {messages.map((message, i) => {
                    const isSentByCurrentUser = user === message.user;
                    return (
                        <ListItem key={i} className={classes.mainContainer}>
                            <Grid container>
                                <ListItemText align={isSentByCurrentUser ? "right" : "left"}>
                                    <Typography variant="subtitle2">{message.user}</Typography>
                                </ListItemText>
                                <Grid item xs={12}>
                                    <ListItemText
                                        className={classes.messageContainer}
                                        align={isSentByCurrentUser ? "right" : "left"}
                                        primary={ReactEmoji.emojify(message.text)}
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    );
                })}
            </List>
        </ScrollToBottom>
    );
};

export default MessageList;
