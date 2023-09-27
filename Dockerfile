FROM mcr.microsoft.com/devcontainers/ruby:3.0-bullseye

ARG NODE_VERSION="16"
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"
