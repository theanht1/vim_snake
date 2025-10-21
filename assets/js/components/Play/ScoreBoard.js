import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { getSnakeColor } from "../../utils/gamePlay";

const ScoreBoard = ({ currentUser, players, snakes, highscore }) => {
  const getSortedScore = (players, snakes) => {
    return players
      .map((player) => {
        const snake = snakes.find((s) => s.user_id === player.user_id);
        return {
          ...player,
          score: snake ? snake.pos.length : 0,
        };
      })
      .sort((s1, s2) => (s1.score < s2.score ? 1 : -1));
  };

  const users = getSortedScore(players, snakes);

  return (
    <div>
      {highscore.score && (
        <div className="mb-4">
          Highscore: <strong>{highscore.score}</strong> by&nbsp;
          <strong
            style={{ color: `#${getSnakeColor(highscore.user.user_id)}` }}
          >
            {highscore.user.username}
          </strong>
        </div>
      )}
      <div className="mgt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="w-36">Player</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  No players
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.user_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <strong
                      style={{ color: `#${getSnakeColor(user.user_id)}` }}
                    >
                      {user.username}
                    </strong>
                  </TableCell>
                  <TableCell>{user.score}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(ScoreBoard);
