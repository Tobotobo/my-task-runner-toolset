/**
 * 数値の配列を ArrayBuffer に変換する
 *
 * @param {Array.<number>} array 変換対象の数値の配列
 * @return {ArrayBuffer} 生成された ArrayBuffer
 */
export function arrayToBuffer(array) {
  const buffer = new ArrayBuffer(array.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < array.length; i++) {
    view[i] = array[i];
  }

  return buffer;
}
