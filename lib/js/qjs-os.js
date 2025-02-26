import * as os from 'qjs:os';

/**
 * プラットフォームのリスト
 * @readonly
 * @enum {string}
 */
export const platforms = Object.freeze({
  linux: 'linux',
  darwin: 'darwin',
  win32: 'win32',
  js: 'js',
});

/**
 * 現在のプラットフォーム
 * `platforms` のいずれかの値を持つ
 * @type {keyof typeof platforms}
 */
export const platform = os.platform;
