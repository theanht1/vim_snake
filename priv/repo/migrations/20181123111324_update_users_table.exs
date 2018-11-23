defmodule VimSnake.Repo.Migrations.UpdateUsersTable do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :highscore, :integer
    end
  end
end
