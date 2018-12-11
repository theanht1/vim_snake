defmodule VimSnake.Store.Snake do
  @moduledoc """
  Store the state of the snakes in game.
  """

  use Agent

  def start_link(_state) do
    Agent.start_link(fn -> [] end, name: __MODULE__)
  end

  def all do
    Agent.get(__MODULE__, fn snakes -> snakes end)
  end

  def reset(snakes) do
    Agent.update(__MODULE__, fn _ -> snakes end)
  end

  def push(snake) do
    Agent.update(__MODULE__, &List.insert_at(&1, -1, snake))
  end

  def delete(player_id) do
    Agent.update(__MODULE__, fn snakes -> Enum.filter(snakes, &(&1.user_id !== player_id)) end)
  end

  def change_direction(player_id, new_dir) do
    Agent.update(__MODULE__, fn snakes ->
      snakes |> Enum.map(fn snake ->
        if snake.user_id === player_id do
          Map.put(snake, :dir, new_dir)
        else
          snake
        end
      end)
    end)
  end

end

