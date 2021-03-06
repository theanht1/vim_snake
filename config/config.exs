# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :vim_snake,
  ecto_repos: [VimSnake.Repo]

# Configures the endpoint
config :vim_snake, VimSnakeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7mt8ob6ETUKh+Vp9zLrEwtJjLensAaPzmYvh9PkN2vQB9A97cL7Z0jXLQDk9HLwy",
  render_errors: [view: VimSnakeWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: VimSnake.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Guardian config
config :vim_snake, VimSnake.Guardian,
  issuer: "vim_snake",
  secret_key: "JGYAxWaH3AS1AkKwO5N/1oZZ5dB2l4PaEOR1TZ049s78E8j4/DygDxsh9386HdiA"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
