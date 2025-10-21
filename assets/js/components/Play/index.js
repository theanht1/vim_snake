import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button } from "../ui/button";

import { initSocket, joinChannel } from "../../socket";
import { updateScore } from "../../actions/gameActions";
import Game, { createGame } from "../../game/game";
import ScoreBoard from "./ScoreBoard";
import { JWT_TOKEN_KEY } from "../../actions/authActions";
import { BOARD_SIZE } from "../../utils/constants";

const Play = ({ currentUser, onUpdateScore }) => {
  const [showPlayMask, setShowPlayMask] = useState(true);
  const [players, setPlayers] = useState([]);
  const [snakes, setSnakes] = useState([]);
  const [highscore, setHighscore] = useState({});

  const socketRef = useRef(null);
  const channelRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (currentUser.id && !socketRef.current) {
      initGame();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, [currentUser.id]);

  const initGame = () => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    socketRef.current = initSocket(token, currentUser);
    channelRef.current = joinChannel(socketRef.current, "game:default");

    gameRef.current = createGame({
      elId: "game",
      channel: channelRef.current,
      user: currentUser,
      width: BOARD_SIZE.width,
      height: BOARD_SIZE.height,
    });

    channelRef.current.on("update_players", ({ players: updatedPlayers }) => {
      setPlayers(updatedPlayers || []);
      if (!updatedPlayers.find((p) => p.user_id === currentUser.id)) {
        setShowPlayMask(true);
      }
    });

    channelRef.current.on("update_snakes", ({ snakes: updatedSnakes }) => {
      setSnakes(updatedSnakes || []);
    });

    channelRef.current.on(
      "update_highscore",
      ({ highscore: updatedHighscore }) => {
        setHighscore(updatedHighscore || {});
      }
    );
  };

  const onStartGame = () => {
    setShowPlayMask(false);
    channelRef.current.push("new_player", {});
  };

  return (
    <div className="flex justify-center flex-wrap">
      <div className="mt-4" style={{ minWidth: BOARD_SIZE.width }}>
        <div className="relative">
          {showPlayMask && (
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: BOARD_SIZE.width + 10,
                height: BOARD_SIZE.height + 13,
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
              }}
            >
              <Button onClick={onStartGame}>Play</Button>
            </div>
          )}
          <div id="game"></div>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold mb-4">Ranking</h3>
        <ScoreBoard players={players} snakes={snakes} highscore={highscore} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
