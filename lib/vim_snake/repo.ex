defmodule VimSnake.Repo do
  use Ecto.Repo,
    otp_app: :vim_snake,
    adapter: Ecto.Adapters.Postgres
end
