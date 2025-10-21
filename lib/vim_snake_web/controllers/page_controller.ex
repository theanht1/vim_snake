defmodule VimSnakeWeb.PageController do
  use VimSnakeWeb, :controller

  def index(conn, _params) do
    conn
    |> put_view(VimSnakeWeb.PageView)
    |> render("index.html")
  end
end
