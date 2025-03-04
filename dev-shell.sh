#!/usr/bin/env bash

# set -x # 実行したコマンドと引数も出力する
set -e          # スクリプト内のコマンドが失敗したとき（終了ステータスが0以外）にスクリプトを直ちに終了する
set -E          # '-e'オプションと組み合わせて使用し、サブシェルや関数内でエラーが発生した場合もスクリプトの実行を終了する
set -u          # 未定義の変数を参照しようとしたときにエラーメッセージを表示してスクリプトを終了する
set -o pipefail # パイプラインの左辺のコマンドが失敗したときに右辺を実行せずスクリプトを終了する
# Bash バージョン 4.4 以上の場合のみ実行
if [[ ${BASH_VERSINFO[0]} -ge 4 && ${BASH_VERSINFO[1]} -ge 4 ]]; then
    shopt -s inherit_errexit # '-e'オプションをサブシェルや関数内にも適用する
fi

# 初期のカレントディレクトリを保存
initial_dir_path="$(pwd)"
# このスクリプトがあるフォルダへのパス
script_dir_path="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# このスクリプトのファイル名
script_file_name="$(basename "${BASH_SOURCE[0]}")"
# スクリプト終了時に初期のカレントディレクトリに戻るよう設定
trap 'cd "${initial_dir_path}"' EXIT
# このスクリプトがあるフォルダにカレントディレクトリを設定
cd "${script_dir_path}"
# .env ファイルが存在する場合は読込み
if [[ -f ".env" ]]; then
    source .env
fi

############################################################

# すでに dev-shell で起動されている場合はエラー
if [ -n "${DEV_SHELL-}" ]; then
    echo [ERR] すでに dev-shell で起動されています。
    exit 1
fi

# tools フォルダへのパス
export TOOLS=${script_dir_path}/tools

# OS 個別処理
if [[ "$(uname -s)" == "Linux" ]]; then
    export TOOLS_OS=Linux
    export BASH=bash
else
    export TOOLS_OS=windows
    if [ -z "${BASH}" ]; then
        export BASH=C:/Program Files/Git/bin/bash.exe
    else
        export BASH=${BASH}
    fi
fi

# PATH に追加
export PATH=${TOOLS}:${TOOLS}/${TOOLS_OS}:${PATH}

# dev-shell で起動済みフラグを立てる
export DEV_SHELL=1

"${BASH}" --rcfile "${TOOLS}/.bashrc"
