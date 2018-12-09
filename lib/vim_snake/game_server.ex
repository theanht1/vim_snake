defmodule VimSnake.GameServer do
  @moduledoc """
  GameServer executes and loop game engine
  """

  use GenServer

  alias VimSnake.Engine.Game

  @worker_interval 1000

  def start_link(state \\ %{}) do
    GenServer.start_link(__MODULE__, state, name: __MODULE__)
  end

  def init(state) do
    :timer.send_interval(@worker_interval, :work)
    state = state |> Map.put(:time, DateTime.utc_now)
    {:ok, state}
  end

  def handle_info(:work, state) do
    Game.run()
    state = state |> Map.put(:time, DateTime.utc_now)
    {:noreply, state}
  end

end

