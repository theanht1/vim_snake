defmodule VimSnakeWeb.GameChannel do
  use VimSnakeWeb, :channel

  alias VimSnake.Store.{Player, Snake, Ranking}
  alias VimSnake.Engine.Game
  alias VimSnake.Constant

  def join("game:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("new_player", state, socket) do
    user = socket.assigns.user
    state
    |> Map.put(:user_id, user.id)
    |> Map.put(:username, user.username)
    |> Player.put()

    Ranking.put(%{user_id: user.id, value: 0})
    new_snake = Game.new_snake_position()
    Snake.push(%{
      user_id: user.id,
      pos: new_snake.pos,
      dir: new_snake.dir,
      protected: true,
      created_at: DateTime.utc_now,
    })

    broadcast(socket, "update_players", %{players: Player.all()})
    broadcast(socket, "update_snakes", %{snakes: Snake.all()})
    broadcast(socket, "update_ranking", %{ranking: Ranking.all()})

    {:noreply, socket}
  end

  def handle_in("change_direction", state, socket) do
    user = socket.assigns.user
    Snake.change_direction(user.id, state["direction"]);

    {:noreply, socket}
  end

  def terminate(_msg, socket) do
    user = socket.assigns.user
    Player.delete(user.id)
    Snake.delete(user.id)
    Ranking.delete(user.id)
    broadcast(socket, "update_players", %{players: Player.all()})
    broadcast(socket, "update_snakes", %{snakes: Snake.all()})
    broadcast(socket, "update_ranking", %{ranking: Ranking.all()})
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
