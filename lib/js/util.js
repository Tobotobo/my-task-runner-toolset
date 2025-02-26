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

/**
 * ファイルディスクリプタから全データを読み込み、連結した Uint8Array を返す関数です。
 * <p>
 * この関数は、指定されたファイルディスクリプタ（read() メソッドを持つオブジェクト）
 * から一定サイズずつデータを読み込み、全てのチャンクを連結して一つのバッファとして返します。
 * </p>
 * @param {Object} fd - ファイルディスクリプタです。read() メソッドによりデータ読み込みが可能である必要があります。
 * @returns {Uint8Array} 読み込んだ全データを連結したバッファを返します。
 */
export function readAll(fd) {
  const accumulatedChunks = [];
  const buffer = new Uint8Array(256);
  let bytesRead = 0;
  while (true) {
    // fd.read() により buffer に読み込みます
    bytesRead = fd.read(buffer.buffer, 0, buffer.length);
    if (bytesRead === 0) {
      // 読み込むデータがなくなった場合はループを抜けます
      break;
    }
    // 読み込んだ bytesRead 分だけ新しい Uint8Array を作成し、データをコピーします
    const chunk = new Uint8Array(bytesRead);
    chunk.set(buffer.subarray(0, bytesRead));
    accumulatedChunks.push(chunk);
  }

  // 全チャンクの合計バイト数を求めます
  const totalLength = accumulatedChunks.reduce((sum, chunk) => sum + chunk.length, 0);
  // 合計バイト数分の新しいバッファを作成します
  const resultBuffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of accumulatedChunks) {
    resultBuffer.set(chunk, offset);
    offset += chunk.length;
  }

  return resultBuffer;
}
