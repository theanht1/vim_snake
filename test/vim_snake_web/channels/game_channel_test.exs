defmodule VimSnakeWeb.GameChannelTest do
  use VimSnakeWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      socket(VimSnakeWeb.UserSocket, "user_id", %{some: :assign})
      |> subscribe_and_join(VimSnakeWeb.GameChannel, "game:lobby")

    {:ok, socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

  test "shout broadcasts to game:lobby", %{socket: socket} do
    push socket, "shout", %{"hello" => "all"}
    assert_broadcast "shout", %{"hello" => "all"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end
end
