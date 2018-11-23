defmodule VimSnake.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :username, :string
    field :picture, :string
    field :highscore, :integer

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :username, :picture, :highscore])
    |> validate_required([:email, :username])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:username, min: 4)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
  end
end
