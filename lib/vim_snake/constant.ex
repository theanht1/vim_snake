defmodule VimSnake.Constant do

  @direction %{
    up: 0,
    right: 1,
    down: 2,
    left: 3,
  }

  @snake %{
    init_length: 2,
  }

  @game %{
    width: 60,
    height: 35,
    min_food: 5,
  }

  def direction, do: @direction
  def snake, do: @snake
  def game, do: @game

end
