defmodule VimSnake.Store.Ranking do
  @moduledoc """
  Store the state of the game ranking.
  """

  use Agent

  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def all do
    Agent.get(__MODULE__, fn players ->
      players
      |> Map.to_list()
      |> Enum.map(&elem(&1, 1))
      |> Enum.sort(&(&1.value > &2.value))
    end)
  end

  def put(position) do
    Agent.update(__MODULE__, &Map.put(&1, position.user_id, position))
  end

  def get(player_id) do
    Agent.get(__MODULE__, &Map.get(&1, player_id, default_attrs(player_id)))
  end

  def delete(player_id) do
    Agent.update(__MODULE__, &Map.delete(&1, player_id))
  end

  def clean do
    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp default_attrs(player_id), do: %{player_id: player_id, value: 0}

end
