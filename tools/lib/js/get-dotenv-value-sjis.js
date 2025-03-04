import Encoding from './qjs-encoding.js';
import * as dotenv from './dotenv-parse.js';
import * as std from 'qjs:std';
import * as util from './util.js';

const filePath = scriptArgs[1];
const envName = scriptArgs[2];

const file = std.open(filePath, "r");
if (!file) {
  throw new Error(`Failed to open file: ${filePath}`);
}
const content = file.readAsString();
file.close();

const env = dotenv.parse(content);
const value = env[envName] ?? "";

const unicodeArrayValue = Encoding.stringToCode(value);
const sjisArrayValue = Encoding.convert(unicodeArrayValue, {
  from: 'UNICODE',
  to: 'SJIS'
});
const sjisBufferValue = util.arrayToBuffer(sjisArrayValue);
std.out.write(sjisBufferValue, 0, sjisBufferValue.byteLength);
