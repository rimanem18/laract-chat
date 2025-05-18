# Laract Chat

Laract Chat は Laravel と React で開発された Web チャットアプリです。  
一応ポートフォリオ作品ということになってます。

## 開発するにあたって目的・目標としたこと

1. Docker の知見を深める。
1. React+Redux の知見を深める
1. CI/CD の知見を深める
1. issue を立ててちゃんと進捗状況を管理する
1. プルリク・マージにチャレンジする

Docker が扱えるようになることが第一目標。  
Docker と React、データベースを使ったなにかを作りたいと考えた。  
API サーバーに Laravel を選定したのは、一般的なレンタルサーバーで動作する PHP を使ったフレームワークを使いたいと思ったため。

## 使用している技術

- Docker
- Laravel
- React
- MySQL
- Github Actions

以下の public template を利用しています。  
https://github.com/ucan-lab/docker-laravel

## コンテナ構造

```
├── app
├── web
└── db
```

### app コンテナ

- ベースイメージ
  - php:8.0-fpm-buster
  - composer 2.0

### web コンテナ

- ベースイメージ
  - node:16-alpine
  - nginx:1.20-alpine

### db コンテナ

- ベースイメージ
  - mysql/mysql-server:8.0

## 所感

### 得られたもの

Docker の学習をしている中で、わかりやすい解説＆とても扱いやすい public template を見つけたのが大きかった。  
[【超入門】20 分で Laravel 開発環境を爆速構築する Docker ハンズオン](https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4)  
[最強の Laravel 開発環境を Docker を使って構築する](https://qiita.com/ucan-lab/items/5fc1281cd8076c8ac9f4)

今回のアプリケーションではイチから Docker の設定を書いてはいないが、一部を改変したりすることでおのずと Docker 関連の設定をイチから書くことができる能力が身についた。「Docker の知見を深める」という開発の目的は果たせたと思う。  
実例をあげると WordPress 開発をするときにコンテナを自分で作ったりということをしている。

CI/CD についても、実現できているので目標は達成できた。

また、今まで趣味のアプリで「どうせ自分しか使わないし実装しなくていいか」などと避けていたような面倒な部分を実装できるようにつとめたことで、以下の知見が副産物として得られた。

- React
  - Jest によるテストの実装
  - カスタムフックの実装
  - Redux の実践的な活用（状態管理の正規化に関する知見）
  - reselect を使ったパフォーマンスチューニング
- Laravel / MySQL
  - バックエンド / データベースの設計
  - 中間テーブルの扱い
- ほか
  - Makefile という便利なファイル

とくに Redux については、以下の解説が大いに役立った。  
[React / Redux を実務で使うということは](https://zenn.dev/suzuesa/articles/35ace7a7cd127f9a1d08)

### 反省点

本番環境が LiteSpeed であるにもかかわらず、nginx のコンテナを使っている点。  
LiteSpeed は公式でいい感じのベースイメージが配布されていなかった。Ubuntu イメージから作ってみたりと挑戦はしたが、どうもうまく行かず、Web サーバーソフトの差異については妥協することにした。  
（そもそも LiteSpeed と互換性のある Apache を使うという手もあったが、開発体験を考慮して nginx のままとした）

次に、ロール機能の実装が中途半端になっている点。  
ロールを追加したり、あるいはロールを必要とするグループを Seeder やコマンドで生成することはできるが、管理画面などは用意されていない。  
必要最低限の実装をするのに半年もかかり、管理画面の用意まで手が回らなかった。
だからといっていつになってもポートフォリオ作品の役目を果たせないのはもったいないと判断して一旦公開することとした。

## 動かすには？

```
make up
```

```
make init
```

http://localhost にアクセスすることで確認可能。

「デモユーザーとしてログイン」というボタンを押下すると、「Demo User」という人物でログインできる。

その他、以下のようなユーザーが初期作成されて利用可能。

- 太郎
  - taro@example.com
  - taroPass
- Mike
  - mike@example.com
  - mikePass
