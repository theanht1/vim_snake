defmodule VimSnake.Store.Info do
  @moduledoc """
  Store the state of the game info.
  """

  use Agent

  def start_link(_state) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def get_highscore do
    Agent.get(__MODULE__, &Map.get(&1, :highscore, default_score()))
  end

  def put(key, value) do
    Agent.update(__MODULE__, &Map.put(&1, key, value))
  end

  def get(key) do
    Agent.get(__MODULE__, &Map.get(&1, key))
  end

  def delete(key) do
    Agent.update(__MODULE__, &Map.delete(&1, key))
  end

  def clean do
    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp default_score do
    %{ score: 0 }
  end
end
