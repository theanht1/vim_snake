# Classical multiplayer snake game with Vim-style keybinding
This is a project using Phoenix framework and Phaser to make a multiplayer snake game, inspired by vimsnake.com

Live demo can be found on [Heroku](https://vim-snake.herokuapp.com/)

### Preview
![Gameplay Screenshot](./priv/static/images/screen_shot.png)

### Requirements

* [Elixir 1.4 or later](https://elixir-lang.org/install.html)
* Erlang 18 or later
* Node.js v8
* PostgreSQL

### Up and Running

* Install package
```
mix deps.get
cd assets && npm i && cd ..
```

* Create and migrate database
```
mix ecto.create
mix ecto.migrate
```

* Start dev server
```
mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### Deployment
You can follow [this instruction](https://hexdocs.pm/phoenix/deployment.html) to configure for production


### TODOs
* Re-enable login feature (with FB or Google) for reserving username and saving personal highscore
* Add unit tests
