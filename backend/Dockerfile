FROM mcr.microsoft.com/devcontainers/ruby:3.0-bullseye
# FROM ruby:3.1
# 公式→https://hub.docker.com/_/ruby
# Rails 7ではWebpackerが標準では組み込まれなくなったので、yarnやnodejsのインストールが不要
# ruby3.1のイメージがBundler version 2.3.7で失敗するので、gemのバージョンを追記
ARG RUBYGEMS_VERSION=3.3.20

# RUN：任意のコマンド実行
RUN mkdir /app

# WORKDIR：作業ディレクトリを指定
WORKDIR /app

# COPY：コピー元とコピー先を指定
# ローカルのGemfileをコンテナ内の/app/Gemfileに
COPY Gemfile /app/Gemfile

COPY Gemfile.lock /app/Gemfile.lock

# RubyGemsをアップデート
RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

COPY . /app