defmodule VimSnake.Engine.Game do

  alias VimSnake.Store.{Player, Snake, Ranking, Food}
  alias VimSnake.Constant
  alias VimSnakeWeb.Endpoint
  alias VimSnake.Engine.Utils

  def run do
    snakes = Snake.all()
    |> Enum.map(&update_protected(&1))
    |> Enum.map(&update_position(&1))

    died_snakes = snakes
                  |> Enum.filter(fn snake -> wall_collision?(snake) || self_collision?(snake) end)
    alive_snakes = snakes
                   |> Enum.filter(fn snake -> !wall_collision?(snake) && !self_collision?(snake) end)

    if length(died_snakes) > 0 do
      Enum.each(died_snakes, fn snake ->
        Player.delete(snake.user_id)
        Ranking.delete(snake.user_id)
      end)
      Endpoint.broadcast("game:lobby", "update_players", %{players: Player.all()})
    end

    foods = Food.all()
    n_food = length(foods)

    if n_food < Constant.game.min_food do
      1..(Constant.game.min_food - n_food)
      |> Enum.each(fn _ -> get_available_position() |> Food.push() end)
    end

    Snake.reset(alive_snakes)

    Endpoint.broadcast("game:lobby", "update_snakes", %{snakes: Snake.all()})
    Endpoint.broadcast("game:lobby", "update_foods", %{foods: Food.all()})
  end

  def new_snake_position do
    [x, y] = get_available_position()

    %{
      pos: Enum.map(1..Constant.snake.init_length, fn _ -> [x, y] end),
      dir: Utils.get_best_direction([x, y]),
    }
  end

  defp update_protected(snake) do
    if snake.protected && DateTime.diff(DateTime.utc_now, snake.created_at) > 5 do
      Map.put(snake, :protected, false)
    else
      snake
    end
  end

  defp update_position(snake) do
    # Find new head position
    head = List.first(snake.pos)
    [head_x, head_y] = head
    new_head = cond do
      snake.dir == Constant.direction.up ->
        [head_x, head_y - 1]
      snake.dir == Constant.direction.right ->
        [head_x + 1, head_y]
      snake.dir == Constant.direction.down ->
        [head_x, head_y + 1]
      snake.dir == Constant.direction.left ->
        [head_x - 1, head_y]
    end

    # Find collision foods
    food_index = if snake.protected, do: nil, else: Enum.find_index(Food.all(), &(&1 == head))
    remove_tail = fn(pos, food_index) ->
      if is_integer(food_index), do: pos, else: List.delete_at(pos, -1)
    end

    if is_integer(food_index), do: Food.delete(head)

    snake
    |> Map.put(:pos, snake.pos
      |> remove_tail.(food_index)
      |> List.insert_at(0, new_head))
  end

  defp wall_collision?(snake) do
    [head_x, head_y] = List.first(snake.pos)
    head_x < 0 || head_x >= Constant.game.width || head_y < 0 || head_y >= Constant.game.height
  end

  defp self_collision?(snake) do
    head = List.first(snake.pos)
    if snake.protected do
      false
    else
      (snake.pos
      |> Enum.filter(fn p -> p === head end)
      |> length) > 1
    end
  end

  defp snake_tiles do
    snakes = Snake.all()
    Enum.reduce(snakes, MapSet.new, fn snake, snake_acc ->
      if snake.protected do
        snake_acc
      else
        Enum.reduce(snake.pos, MapSet.new, fn pos, pos_acc ->
          MapSet.put(pos_acc, pos)
        end)
        |> MapSet.union(snake_acc)
      end
    end)
  end

  defp get_available_position do
    foods = Food.all()

    not_available_pos = snake_tiles |> MapSet.union(MapSet.new(foods))

    available_pos = Enum.reduce(0..(Constant.game.width - 1), [], fn x, x_acc ->
      x_acc ++ Enum.reduce(0..(Constant.game.height - 1), [], fn y, y_acc ->
        if !MapSet.member?(not_available_pos, [x, y]) do
          [[x, y] | y_acc]
        else
          y_acc
        end
      end)
    end)

    Enum.random(available_pos)
  end
end

