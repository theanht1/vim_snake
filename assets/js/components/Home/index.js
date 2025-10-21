import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createNewGuestUser } from "../../actions/authActions";
import { showNotification } from "../../utils";

const Home = ({ loginLoading, onPlay }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      showNotification("error", {
        title: "Error",
        message: '"username" cannot be empty',
      });
      return;
    }

    await onPlay(username);
    navigate("/play");
  };

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Snake Vim Trainer</h1>
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <p className="mb-2">
        Make your Vim snake eat the food to increase your score.
      </p>
      <p className="mb-2">
        Source code available on{" "}
        <a
          href="https://github.com/theanht1/vim_snake"
          className="text-primary hover:underline"
        >
          github
        </a>
      </p>
      <p className="mb-2">Controls:</p>
      <ul className="mb-6 list-disc list-inside">
        <li>
          Left: <strong>h</strong>
        </li>
        <li>
          Down: <strong>j</strong>
        </li>
        <li>
          Up: <strong>k</strong>
        </li>
        <li>
          Right: <strong>l</strong>
        </li>
      </ul>
      <form onSubmit={onSubmit} className="flex items-end gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-64"
          />
        </div>
        <Button type="submit" disabled={loginLoading}>
          {loginLoading ? "Loading..." : "Play"}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ auth: { loginLoading } }) => ({
  loginLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onPlay: (username) => dispatch(createNewGuestUser(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
