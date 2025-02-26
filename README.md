# my-task-runner-toolset

## 概要
* ※途中（以下はやりたいと思ってるだけ）
* タスクランナーに Just を用いる
* Windows でも Linux でも bash を使えるようにする
* Shell スクリプトを使えるようにする
* JavaScript を使えるようにする
* エラーが起きたら止まるようにする（後続処理を実行しない）
* 容量を少なくし、再配布に支障が無いようにする

## 留意事項
* 本リポジトリには、GPL v2 ライセンスの下で配布されている BusyBox および BusyBox for Windows の実行ファイルが含まれています。  
  これらのプログラムのライセンス詳細およびソースコードについては、以下のサイトを参照してください。  
  - **BusyBox**: https://github.com/mirror/busybox/  
  - **BusyBox for Windows**: https://github.com/rmyorston/busybox-w32

## 詳細

```
$ just
タスク一覧:
    hello-just
    hello-qjs
    hello-script
    list         # タスク一覧を表示
```
```
$ just hello-just
Hello Just!
```

```
$ qjs ./scripts/qjs-shell-example.js
あいうえお
```

