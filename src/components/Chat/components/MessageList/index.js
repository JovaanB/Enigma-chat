import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";

const useStyles = makeStyles({
    messageArea: {
        height: "70vh",
        overflowY: "auto",
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
                        <ListItem key={i}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={isSentByCurrentUser ? "right" : "left"}
                                        primary={ReactEmoji.emojify(message.text)}
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={isSentByCurrentUser ? "right" : "left"}
                                        secondary={message.user}
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
