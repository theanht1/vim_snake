defmodule VimSnake.Engine.Utils do

  alias VimSnake.Constant

  def get_best_direction([x, y]) do
    if x < Constant.game.width - x do
      Constant.direction.right
    else
      Constant.direction.left
    end
  end

end
