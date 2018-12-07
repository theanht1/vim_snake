defmodule VimSnake.Store.Food do
  @moduledoc """
  Store the state of the foods in game.
  """

  use Agent

  def start_link do
    Agent.start_link(fn -> [] end, name: __MODULE__)
  end

  def all do
    Agent.get(__MODULE__, fn foods -> foods end)
  end

  def reset(foods) do
    Agent.update(__MODULE__, fn _ -> foods end)
  end

  def push(food) do
    Agent.update(__MODULE__, &List.insert_at(&1, -1, food))
  end

  def delete(food) do
    Agent.update(__MODULE__, &Enum.filter(&1, fn f -> f !== food end))
  end
end


