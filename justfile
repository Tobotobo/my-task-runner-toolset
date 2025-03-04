qjs-version-range := ">=0.8.0"

# タスク一覧から選択して実行（デフォルト）
[group('task')]
task-choose:
  @just --choose --chooser "fzf --height=~20 --with-shell='busybox ash -uc' --style full --preview 'just --unstable --color always --show {}'"

# タスク選択を終了
[group('task')]
@task-choose-quit:
  # 何もしない

# タスク一覧を表示
[group('task')]
task-list:
  @just --list --unsorted --list-heading $'タスク一覧:\n'
alias list := task-list
alias ls := task-list

# 必要なツールが揃っているかと、そのバージョンの確認
[group('tool')]
tool-check:
  just --version
  @{{satisfies}} "`just --version`" ">=1.39.0"
  qjs --help | grep version
  @{{satisfies}} "`qjs --help | grep version`" "{{qjs-version-range}}"
  fzf --version
  @{{satisfies}} "`fzf --version`" ">=0.60.2"

import "./scripts/hello-just.just"
import "./scripts/hello-script.just"

[script("qjs")]
hello-qjs:
  const name = 'QuickJS';
  console.log(`Hello ${name}`);

# -----------------------------------------------------------
# Just の設定
set unstable
# set quiet
set dotenv-load
# set windows-shell := [ "bash", "-uc"]
set shell := ["bash", "-uc"]
set script-interpreter := ["bash"]
SCRIPT_INIT := """
  set -eEuo pipefail 
  # set -eEuxo pipefail
"""
OK := GREEN + "OK" + NORMAL
NG := RED + "NG" + NORMAL
justfile_dir := replace(justfile_dir(),"\\","/")
satisfies := "qjs '" + justfile_dir + "/tools/lib/js/satisfies.js'"
