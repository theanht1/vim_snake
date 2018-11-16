defmodule VimSnakeWeb.PageController do
  use VimSnakeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
