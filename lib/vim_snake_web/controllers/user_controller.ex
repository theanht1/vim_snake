defmodule VimSnakeWeb.UserController do
  use VimSnakeWeb, :controller

  alias VimSnake.Accounts
  alias VimSnake.Accounts.User
  alias VimSnake.Guardian

  action_fallback VimSnakeWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def login(conn, %{"user" => %{"id_token" => id_token}}) do
    with (%User{} = user) <- Accounts.google_sso!(id_token),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn
      |> render("jwt.json", jwt: token, user: user)
    else
      _ -> {:error, :unauthorized}
    end
  end

  def me(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    conn |> render("show.json", user: user)
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
