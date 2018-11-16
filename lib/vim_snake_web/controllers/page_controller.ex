defmodule VimSnakeWeb.PageController do
  use VimSnakeWeb, :controller

  def index(conn, _params) do
    conn
    |> render("index.html")
  end
end
