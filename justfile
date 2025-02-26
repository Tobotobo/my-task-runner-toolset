set unstable
set quiet
set windows-shell := ["./tools/busybox.exe", "bash", "-uc"]
# set shell := ["./tools/busybox", "bash", "-uc"]
# set shell := ["bash", "-uc"]
set shell := ["./tools/busybox", "ash", "-uc"]

# TODO set -eEuo pipefail を内蔵できる？
set script-interpreter := ["./tools/busybox", "ash"]
qjs := "./tools/qjs"

script-init := """
    set -eEuo pipefail 
    # set -eEuxo pipefail
"""

# タスク一覧を表示
list:
    @./tools/just --list --list-heading $'タスク一覧:\n'
    # just --list --unsorted --list-heading $'タスク一覧:\n'

import "./scripts/hello-just.just"
import "./scripts/hello-script.just"

[script("./tools/qjs")]
hello-qjs:
    const name = 'QuickJS';
    console.log(`Hello ${name}`);
