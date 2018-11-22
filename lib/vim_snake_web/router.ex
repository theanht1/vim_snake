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

  # Other scopes may use custom stacks.
  scope "/api/v1", VimSnakeWeb do
    pipe_through :api

    resources "/users", UserController, only: [:create, :show]
    post "/login", UserController, :login
  end

  scope "/", VimSnakeWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

end
