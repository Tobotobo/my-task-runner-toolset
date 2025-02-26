import * as std from 'qjs:std';
import Encoding from './qjs-encoding.js';
import * as util from './util.js';

export function $(strings, ...values) {
    const cmd = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
    return busyboxBash(cmd);
}

export function busyboxBash(cmd) {
    const escapedCmd = cmd.replace(/'/g, "''");
    return powershell(`busybox bash -uc '${escapedCmd}'`);
}

export function powershell(cmd) {
    const unicodeArrayCmd = Encoding.stringToCode(cmd);
    const utf16leArrayCmd = Encoding.convert(unicodeArrayCmd, {
        from: 'UNICODE',
        to: 'UTF16LE'
    });
    const base64Cmd = Encoding.base64Encode(utf16leArrayCmd);
    const fd = std.popen(`powershell -EncodedCommand ${base64Cmd}`, 'r');
    const sjisArrayOutput = util.readAll(fd);
    fd.close();
    const unicodeArrayOutput = Encoding.convert(sjisArrayOutput, {
        from: 'SJIS',
        to: 'UNICODE'
    });
    const output = Encoding.codeToString(unicodeArrayOutput);
    return output.trim();
}
