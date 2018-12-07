defmodule VimSnake.Constant do

  @direction %{
    up: 0,
    right: 1,
    down: 2,
    left: 3,
  }

  def direction, do: @direction

end
