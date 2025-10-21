defmodule VimSnakeWeb.LayoutView do
  use VimSnakeWeb, :view

  # Phoenix LiveView uses root layout
  def render("root.html", assigns) do
    ~H"""
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="csrf-token" content={Plug.CSRFProtection.get_csrf_token()} />
        <title>VimSnake</title>
        <link rel="stylesheet" href={Routes.static_path(@conn, "/css/app.css")}/>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <%= if ga_code = System.get_env("GA_CODE") do %>
          <script async src={"https://www.googletagmanager.com/gtag/js?id=#{ga_code}"}></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '<%= ga_code %>');
          </script>
        <% end %>
      </head>
      <body>
        <%= @inner_content %>
        <script type="text/javascript" src={Routes.static_path(@conn, "/js/index.js")}></script>
      </body>
    </html>
    """
  end
end
