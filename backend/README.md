# README

## How to deploy Rails API Server on EC2

### 作業

0. `Dockerfile`と`docker-compose.yml`作成
   - コンテナ起動後の設定やコマンド入力が不要になるように修正
1. 新しい EC2 インスタンスを立ち上げ
   - Amazon Linux ではなく Ubuntu
   - セキュリティグループの設定で 3000 番ポートを開放
   - docker インストール
2. EC2 インスタンスに ssh 接続
3. EC2 インスタンス内の FW 設定でポート開放
   1. `sudo ufw enable`
   2. `sudo ufw allow 3000`
   3. `sudo ufw reload`
   4. `sudo ufw status`
4. 事前に github に上げておいた backend ディレクトリを`clone`
5. コンテナ起動
   1. `docker compose build`
   2. `docker compose up -d`

### 参考

- ubuntu に docker インストール
  - https://kinsta.com/jp/blog/install-docker-ubuntu/#:~:text=1.%20apt%E3%83%AC%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Docker%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B
- ubuntu のポート開放
  - https://qiita.com/siida36/items/be21d361cf80d664859c
- ubuntu でポートを使用しているプロセスの確認
  - `sudo lsof -i TCP``
  - https://qiita.com/toshihirock/items/c6a09575c2d88c210483
- 手元のマシンからの疎通確認
  - `nc -vz http://hoge.jp 3000`
  - https://qiita.com/yasushi-jp/items/e888c894859ab750f369#:~:text=2.-,nc%EF%BC%88netcat%EF%BC%89%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%EF%BC%88Linux%E3%81%AE%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%EF%BC%89,-%EF%BC%92%E3%81%A4%E7%9B%AE
- ローカルで production モードで動くことを確かめる
  - https://qiita.com/mokuo/items/207144d6bb18967a9f62
