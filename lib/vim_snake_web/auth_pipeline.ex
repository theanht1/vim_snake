defmodule VimSnake.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :vim_snake, module: VimSnake.Guardian,
    error_handler: VimSnake.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource

end
