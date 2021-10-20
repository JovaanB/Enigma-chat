import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
    messageArea: {
        height: "78vh",
        overflowY: "auto",
    },
    messageBox: {
        background: "#f3f3f3",
        borderRadius: "20px",
        padding: "5px 20px",
        color: "white",
        display: "inline-block",
        maxWidth: "80%",
    },
    messageText: {
        width: "100%",
        letterSpacing: "0",
        float: "left",
        fontSize: "1.1em",
        wordWrap: "break-word",
    },
    messageContainer: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "0 5%",
        marginTop: "3px",
    },
    sentText: {
        display: "flex",
        alignItems: "center",
        color: "#828282",
        letterSpacing: "0.3px",
    },
    pl10: {
        paddingLeft: "10px",
    },
    pr10: {
        paddingRight: "10px",
    },
    justifyStart: {
        justifyContent: "flex-start",
    },
    justifyEnd: {
        justifyContent: "flex-end",
    },
    colorWhite: {
        color: "white",
    },
    colorDark: {
        color: "#353535",
    },
    backgroundBlue: {
        background: "#2979ff",
    },
    backgroundLight: {
        background: "#f3f3f3",
    },
});
const MessageList = ({ messages, user }) => {
    const classes = useStyles();

    return (
        <ScrollToBottom>
            <List className={classes.messageArea}>
                {messages.map((message, i) => {
                    const isSentByCurrentUser = user === message.user;
                    return isSentByCurrentUser ? (
                        <div className={`${classes.messageContainer} ${classes.justifyEnd}`}>
                            <Typography variant="subtitle2" className={`${classes.sentText} ${classes.pr10}`}>
                                {message.user}
                            </Typography>
                            <div className={`${classes.messageBox} ${classes.backgroundBlue}`}>
                                <Typography
                                    variant="subtitle1"
                                    className={`${classes.messageText} ${classes.colorWhite}`}
                                >
                                    {ReactEmoji.emojify(message.text)}
                                </Typography>
                            </div>
                        </div>
                    ) : (
                        <div className={`${classes.messageContainer} ${classes.justifyStart}`}>
                            <div className={`${classes.messageBox} ${classes.backgroundLight}`}>
                                <Typography
                                    variant="subtitle1"
                                    className={`${classes.messageText} ${classes.colorDark}`}
                                >
                                    {ReactEmoji.emojify(message.text)}
                                </Typography>
                            </div>
                            <Typography variantr="subtitle2" className={`${classes.sentText} ${classes.pl10}`}>
                                {message.user}
                            </Typography>
                        </div>
                    );
                })}
            </List>
        </ScrollToBottom>
    );
};

export default MessageList;
