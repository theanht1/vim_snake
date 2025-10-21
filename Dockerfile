# Multi-stage build for Phoenix application

# Stage 1: Build the application
FROM hexpm/elixir:1.19.1-erlang-28.1.1-alpine-3.21.0 AS build

# Install build dependencies
RUN apk add --no-cache build-base git nodejs npm

# Set working directory
WORKDIR /app

# Install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Set build ENV
ENV MIX_ENV="prod"

# Install mix dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only prod
RUN mkdir config

# Copy config files needed for compilation
COPY config/config.exs config/runtime.exs ./config/
RUN mix deps.compile

# Copy assets
COPY assets/package.json assets/package-lock.json ./assets/
RUN cd assets && npm ci --progress=false --no-audit --loglevel=error

# Copy application code
COPY priv priv
COPY lib lib
COPY assets assets

# Compile assets
RUN cd assets && npm run deploy
RUN mix phx.digest

# Compile the release
RUN mix compile

# Build the release
RUN mix release

# Stage 2: Create the runtime image
FROM alpine:3.21.0 AS app

# Install runtime dependencies
RUN apk add --no-cache libstdc++ openssl ncurses-libs

# Set working directory
WORKDIR /app

# Set runner ENV
ENV MIX_ENV="prod"
ENV PHX_SERVER="true"

# Create a non-root user
RUN addgroup -g 1000 app && \
    adduser -D -u 1000 -G app app && \
    chown -R app:app /app

USER app

# Copy the release from the build stage
COPY --from=build --chown=app:app /app/_build/prod/rel/vim_snake ./

# Expose port
EXPOSE 4000

# Start the release
CMD ["/app/bin/vim_snake", "start"]
