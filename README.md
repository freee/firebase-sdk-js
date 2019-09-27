# freee 会計 API SDK for firebase in Javascript （β版）

freee アプリストアのアプリを firebase 上で開発するための SDK です。

## できること

- freee ログイン -> 認可 -> リダイレクト -> firebase にアカウント情報保存 -> firebase ログインの一連の処理
- freee の API をトークンを意識せず呼び出すことが可能
- freee アクセストークン・リフレッシュトークンの暗号化・復号処理

## このSDKについて

本 SDK は主要な機能が含まれていますが、β版のステータスとなっており、制限およびバグがある可能性があります。また、このステータスの記載が更新されるまでは、API やインターフェイスに変更が入る可能性がありますので、ご利用の際はご留意ください。

## 目次

- [チュートリアル](#チュートリアル)
  - [前提条件](#前提条件)
  - [freee アプリストアへのアプリケーション登録](#freee-アプリストアへのアプリケーション登録)
  - [サンプルアプリ](#サンプルアプリ)
  - [SDK の導入方法](#SDK-の導入方法)
- [ライセンス](#ライセンス)

## チュートリアル

本 SDK を利用する手順について記載します。

### 前提条件

本 SDK を利用する前に下記をご確認ください。

- freee 本体のアカウントを持っていること
- firebase のアカウントを持っていること

freee 本体のアカウントは、後述する [freee アプリストアへのアプリケーション登録](#freee-アプリストアへのアプリケーション登録) で必要になります。

freee API に関しては、[チュートリアルガイド](https://app.secure.freee.co.jp/developers/tutorials/1-freee%20API%E3%82%92%E5%A7%8B%E3%82%81%E3%82%8B#freee%20API%E3%82%92%E5%A7%8B%E3%82%81%E3%82%8B) をご参照ください。

firebase の基礎知識については、Google が提供する[firebase のドキュメント](https://firebase.google.com/docs) をご参照ください。

### freee アプリストアへのアプリケーション登録

本 SDK で利用する `ClientId` および `ClientSecret` を取得するため、freee アプリストアの開発者ページでアプリケーションを登録します。

こちらの [チュートリアル | freee アプリストア](https://app.secure.freee.co.jp/developers/tutorials/2-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B) を参考に、アプリケーションを登録して下さい。

### サンプルアプリ

#### WebApp のサンプル

こちらの[サンプルアプリのリポジトリ](https://github.com/freee/freee-app-template-firebase)の README にしたがって、セットアップを行なってください。

### SDK の導入方法

該当のプロジェクトディレクトリで以下のコマンドを実行してください。

`npm install freee-firebase-sdk`

## ライセンス

ライセンスについては下記をご参照ください。

[MIT License](./LICENSE)
