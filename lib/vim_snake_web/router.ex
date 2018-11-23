defmodule VimSnakeWeb.Router do
  use VimSnakeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug VimSnake.Guardian.AuthPipeline
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", VimSnakeWeb do
    pipe_through :api

    post "/login", UserController, :login
  end

  scope "/api/v1", VimSnakeWeb do
    pipe_through :jwt_authenticated

    post "/me", UserController, :me
    post "/highscore", UserController, :update_score
  end

  scope "/", VimSnakeWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

end
