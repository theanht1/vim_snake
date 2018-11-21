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

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn
      |> put_status(:created)
      |> render("jwt.json", jwt: token)
    end
  end

  def login(conn, %{"user" => id}) do
    user = Accounts.get_user!(id)
    {:ok, jwt, _} = Guardian.encode_and_sign(user)
    IO.puts(jwt)
    #IO.puts()
    with {:ok, %User{} = user} <- Accounts.get_user!(id),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      IO.puts(token)
      conn
      |> render("jwt.json", jwt: token)
    end
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
