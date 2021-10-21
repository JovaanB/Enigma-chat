import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import toast from "react-hot-toast";
import Peer from "simple-peer";
import io from "socket.io-client";
import Layout from "../common/Layout";
import { ArrowBack } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

const socket = io.connect(process.env.REACT_APP_API);

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "7fr 3fr",
    },
    myId: {
        marginRight: "5rem",
        borderRadius: "5px",
        background:
            "linear-gradient(to right, #e2e2e2,#c9d6ff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        padding: "2rem",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
    },
    callButton: {
        textAlign: "center",
        marginTop: "2rem",
    },
    videoContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "10rem",
        marginLeft: "10rem",
    },
    backContainer: {
        marginLeft: "10rem",
        width: "50px",
        display: "flex",
        paddingTop: "2rem",
    },
    caller: {
        textAlign: "center",
        color: "#fff",
    },
    body: {
        background:
            "linear-gradient(to right,#8e54e9,#4776e6)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },
});

const Video = () => {
    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });

        socket.on("me", (id) => {
            setMe(id);
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    const copyTextToClipboard = (text) => {
        console.log("text: ", text);
        if (!navigator.clipboard) {
            toast.error("Erreur lors de la copie de l'ID");
            return;
        }
        navigator.clipboard.writeText(text).then(
            function () {
                toast.success("Copie effectuée");
            },
            function (err) {
                toast.error("Erreur lors de la copie de l'ID");
            }
        );
    };

    return (
        <Layout>
            <div
                className={classes.backContainer}
                onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                }}
            >
                <ArrowBack />
                <Typography>Retour</Typography>
            </div>
            <div className={classes.container}>
                <div className={classes.videoContainer}>
                    <div className={classes.video}>
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "25vw" }} />}
                    </div>
                    <div className={classes.video}>
                        {callAccepted && !callEnded ? (
                            <video playsInline ref={userVideo} autoPlay style={{ width: "25vw" }} />
                        ) : null}
                    </div>
                </div>
                <div className={classes.myId}>
                    <TextField
                        id="filled-basic"
                        label="Nom"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => copyTextToClipboard(me)}
                        color="primary"
                        startIcon={<AssignmentIcon fontSize="large" />}
                    >
                        Copier ID
                    </Button>
                    <TextField
                        id="filled-basic"
                        label="ID du partenaire"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className={classes.callButton}>
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                Terminer
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                <PhoneIcon fontSize="large" />
                            </IconButton>
                        )}
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className={classes.caller}>
                            <h1>{name} t'appelle...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Répondre
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    );
};

export default Video;
