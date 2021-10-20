import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@mui/material/Badge";

const UserList = ({ users, userConnected }) => {
    return (
        <List>
            {users.map((user, i) => {
                const itsMe = user.name === userConnected;
                return (
                    <ListItem button key={i}>
                        <ListItemIcon>
                            <Badge overlap="circular" variant="dot" color="success" badgeContent=" ">
                                <Avatar alt={user.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary={itsMe ? <b>{user.name}</b> : user.name}>{user.name}</ListItemText>
                        <ListItemText secondary="En ligne" align="right"></ListItemText>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default UserList;
