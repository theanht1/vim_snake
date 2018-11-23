defmodule VimSnakeWeb.UserView do
  use VimSnakeWeb, :view
  alias VimSnakeWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{user: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      username: user.username,
      picture: user.picture,
      highscore: user.highscore || 0,
    }
  end

  def render("jwt.json", %{jwt: jwt, user: user}) do
    %{jwt: jwt, user: render_one(user, UserView, "user.json")}
  end

end
