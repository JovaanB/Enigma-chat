import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Layout from "../common/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendInput from "./components/SendInput";
import MessageList from "./components/MessageList";
import UserList from "./components/UserList";
import { Close } from "@material-ui/icons";

let socket;

const useStyles = makeStyles({
    chatSection: {
        width: "100%",
        height: "100vh - 35px",
        overflowY: "auto",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
});

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const classes = useStyles();
    const ENDPOINT = "https://enigma-chat-web.herokuapp.com/";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, () => {});

        return () => {
            socket.emit();
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages, users]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => {
                setMessage("");
            });
        }
    };

    return (
        <Layout>
            <div>
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}>
                        <List>
                            <ListItem button key="roomName">
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <ListItemText primary={"Votre salle - " + room}></ListItemText>
                                    <Close
                                        marginX={3}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location = "/";
                                        }}
                                    />
                                </Box>
                            </ListItem>
                        </List>
                        <Divider />
                        <UserList users={users} userConnected={name} />
                    </Grid>
                    <Grid item xs={9}>
                        <MessageList messages={messages} user={name} />
                        <Divider />
                        <SendInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
};

export default Chat;
