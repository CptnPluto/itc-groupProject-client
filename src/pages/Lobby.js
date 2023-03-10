import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../contexts/PlayerContext";
import { useSocket } from "../contexts/SocketContext";
// import io from "socket.io-client";
import MPGamepage from "./MPGamepage";

import "./LobbyCSS.css";

// const socket = io(process.env.REACT_APP_SERVER_URL, {
//     transports: ["websocket", "polling"],
//     withCredentials: true,
// });

const Lobby = () => {
  // const [roomId, setRoomId] = React.useState(null);
  const { playerNum, setPlayerNum, roomId, setRoomId } = usePlayer();
  const [joinRoomId, setJoinRoomId] = React.useState("");
  const [users, setUsers] = React.useState([]);
  // const [gameStarted, setGameStarted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [cells, setCells] = React.useState(null);
  const navigate = useNavigate();

  const socket = useSocket();

  socket.on("user joined", (userId) => {
    setUsers([...users, userId]);
  });

  socket.on("game started", (cells) => {
    setCells(cells);
    // navigate("/MPgamepage");
  });

  //   socket.on("enter game", (cells) => {
  //     setCells(cells);
  //     // navigate("/mpGamepage");
  // });

  socket.on("roomId", ({ roomId, playerNum }) => {
    setRoomId(roomId);
    setPlayerNum(playerNum);
  });

  const handleCreateRoom = () => {
    socket.emit("create room");
  };

  const handleJoinRoom = () => {
    socket.emit("join room", joinRoomId);
  };

  //   const handleReady = () => {
  //     socket.emit("ready", roomId);
  // };

  const handleStartGame = () => {
    socket.emit("start game", roomId);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {cells ? (
        <>
          {/* <p>Game started!</p> */}
          <MPGamepage
            initialCells={cells}
            socket={socket}
            roomId={roomId}
            playerNum={playerNum}
            handleStartGame={handleStartGame}
          />
        </>
      ) : (
        <div className="waiting-room">
          {roomId ? (
            <><span>Leave Room</span>
              <div className="title" onClick={copyRoomId}>
                <h1>Room ID</h1>
                <div>({copied ? "Copied!" : "Click to copy"}): </div>
                <div className="id">{roomId}</div>
              </div>
              <div className="users-list">
                <h2 className="title">Users in Room:</h2>
                <>
                  {users.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </>
              </div>

              {/* <button disabled={users.length < 1} className="button start" onClick={handleReady}>Ready!</button> */}
              <button
                disabled={users.length < 1}
                className="button start"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            </>
          ) : (
            <>
              <div className="title">
                <h1>Dragon Snake Lobby</h1>
              </div>
              <div className="content">
                <button className="button" onClick={handleCreateRoom}>
                  Create New Room
                </button>
                <p>Or</p>
                <div>
                  <label className="label" htmlFor="join-room-input">
                    Enter Room ID:
                  </label>
                  <br />
                  <input
                    id="join-room-input"
                    type="text"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                  />
                </div>
                <button
                  className="button"
                  disabled={joinRoomId.length < 5}
                  onClick={handleJoinRoom}
                >
                  Join Room
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Lobby;
