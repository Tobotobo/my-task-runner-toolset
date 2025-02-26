import * as std from 'qjs:std';
import Encoding from './qjs-encoding.js';
import * as util from './util.js';
import * as os from './qjs-os.js';

export function $(strings, ...values) {
  const cmd = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
  return ash(cmd);
}

export function ash(cmd) {
  const escapedCmd = cmd.replace(/'/g, "''");
  if (os.platform == os.platforms.win32) {
    return powershell(`busybox bash -uc '${escapedCmd}'`);
  } else if (os.platform == os.platforms.linux) {
    const fd = std.popen(`busybox ash -uc '${escapedCmd}'`, 'r');
    const utf8ArrayOutput = util.readAll(fd);
    fd.close();
    const unicodeArrayOutput = Encoding.convert(utf8ArrayOutput, {
      from: 'UTF8',
      to: 'UNICODE'
    });
    const output = Encoding.codeToString(unicodeArrayOutput);
    return output.trim();
  } else {
    throw new Error(`${os.platform} はサポート対象外です。`);
  }
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
