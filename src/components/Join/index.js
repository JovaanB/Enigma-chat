import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TimelineMax, Power1 } from "gsap/all";

import { Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Layout from "../common/Layout";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        "& .MuiTextField-root": {
            margin: "5px",
            width: "300px",
        },
    },
}));

const Join = () => {
    const [tl] = useState(new TimelineMax({ paused: true }));
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const classes = useStyles();

    let isFirstRender = true;
    let inputName = null;
    let inputRoom = null;
    let buttonJoin = null;

    useEffect(() => {
        tl.from(inputName, 0.3, {
            display: "none",
            autoAlpha: 0,
            delay: 0.25,
            ease: Power1.easeIn,
        })
            .from(inputRoom, 0.25, {
                display: "none",
                autoAlpha: 0,
                delay: 0.25,
                ease: Power1.easeInOut,
            })
            .from(buttonJoin, 0.25, {
                display: "none",
                autoAlpha: 0,
                delay: 0.25,
                ease: Power1.easeInOut,
            })
            .play();
    }, []);

    return (
        <Layout>
            <div className={classes.root}>
                <Grid container spacing={3} direction={"column"} justify={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <TextField
                            ref={(e) => (inputName = e)}
                            variant="filled"
                            required
                            label="Nom d'utilisateur"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            ref={(e) => (inputRoom = e)}
                            variant="filled"
                            required
                            label="Votre salle"
                            onChange={(e) => setRoom(e.target.value)}
                            value={room}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Link
                            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                            to={`/chat?name=${name}&room=${room}`}
                        >
                            <Button ref={(e) => (buttonJoin = e)} variant="contained" color="primary" fullWidth>
                                Se connecter
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
};

export default Join;
