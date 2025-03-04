import * as dotenv from './dotenv-parse.js';
import * as std from 'qjs:std';

export function loadEnv(filePath) {
  const file = std.open(filePath, "r");
  if (!file) {
    throw new Error(`Failed to open file: ${filePath}`);
  }
  const content = file.readAsString();
  file.close();
  return dotenv.parse(content);
}
