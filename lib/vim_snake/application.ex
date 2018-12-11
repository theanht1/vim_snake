defmodule VimSnake.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  alias VimSnake.Store.{Player, Info, Snake, Food}
  alias VimSnake.GameServer

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      VimSnake.Repo,
      # Start the endpoint when the application starts
      VimSnakeWeb.Endpoint,
      # Starts a worker by calling: VimSnake.Worker.start_link(arg)
      # {VimSnake.Worker, arg},
      Player,
      Info,
      Snake,
      Food,
      GameServer,
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: VimSnake.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    VimSnakeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
