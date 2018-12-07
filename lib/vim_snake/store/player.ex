defmodule VimSnake.Store.Player do
  use Agent

  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def all do
    Agent.get(__MODULE__, fn players ->
      players |> Map.to_list() |> Enum.map(&elem(&1, 1))
    end)
  end

  def get(player_id) do
    Agent.get(__MODULE__, &Map.get(&1, player_id, %{}))
  end

  def put(player) do
    Agent.update(__MODULE__, &Map.put(&1, player.user_id, player))
  end

  def delete(player_id) do
    Agent.update(__MODULE__, &Map.delete(&1, player_id))
  end

  def clean do
    Agent.update(__MODULE__, fn _ -> %{} end)
  end

end
