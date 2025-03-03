#!/bin/sh

# set -x # 実行したコマンドと引数も出力する
set -e # スクリプト内のコマンドが失敗したとき（終了ステータスが0以外）にスクリプトを直ちに終了する
set -E # '-e'オプションと組み合わせて使用し、サブシェルや関数内でエラーが発生した場合もスクリプトの実行を終了する
set -u # 未定義の変数を参照しようとしたときにエラーメッセージを表示してスクリプトを終了する
# set -o pipefail # パイプラインの左辺のコマンドが失敗したときに右辺を実行せずスクリプトを終了する

# 初期のカレントディレクトリを保存
initial_dir_path="$(pwd)"
# このスクリプトがあるフォルダへのパス
script_dir_path="$(cd "$(dirname "$0")" && pwd)"
# このスクリプトのファイル名
script_file_name="$(basename "$0")"
# スクリプト終了時に初期のカレントディレクトリに戻るよう設定
trap 'cd "${initial_dir_path}"' EXIT
# このスクリプトがあるフォルダにカレントディレクトリを設定
cd "${script_dir_path}"
# # .env ファイルが存在する場合は読込み
# if [[ -f ".env" ]]; then
#     set -a
#     source .env
#     set +a
# fi

############################################################

# すでに dev-shell で起動されている場合はエラー
if [ -n "${DEV_SHELL-}" ]; then
    echo [ERR] すでに dev-shell で起動されています。
    exit 1
fi

# PATH に追加
export PATH=${script_dir_path}/tools:${PATH}

export DEV_SHELL=1
# bash
"C:/Program Files/Git/bin/bash"
