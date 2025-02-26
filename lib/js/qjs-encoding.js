import Encoding from './encoding.min.js'; // encoding-japanese v2.2.0

export default {
  version: Encoding.version,

  /**
   * Encoding orders
   */
  orders: Encoding.orders,

  /**
   * Detects character encoding
   *
   * If encodings is "AUTO", or the encoding-list as an array, or
   *   comma separated list string it will be detected automatically
   *
   * @param {Array.<number>|TypedArray|string} data The data being detected
   * @param {(Object|string|Array.<string>)=} [encodings] The encoding-list of
   *   character encoding
   * @return {string|boolean} The detected character encoding, or false
   */
  detect: (data, encodings) => Encoding.detect(data, encodings),

  /**
   * Convert character encoding
   *
   * If `from` is "AUTO", or the encoding-list as an array, or
   *   comma separated list string it will be detected automatically
   *
   * @param {Array.<number>|TypedArray|string} data The data being converted
   * @param {(string|Object)} to The name of encoding to
   * @param {(string|Array.<string>)=} [from] The encoding-list of
   *   character encoding
   * @return {Array|TypedArray|string} The converted data
   */
  convert: (data, to, from) => Encoding.convert(data, to, from),

  /**
   * Encode a character code array to URL string like encodeURIComponent
   *
   * @param {Array.<number>|TypedArray} data The data being encoded
   * @return {string} The percent encoded string
   */
  urlEncode: (data) => Encoding.urlEncode(data),

  /**
   * Decode a percent encoded string to
   *  character code array like decodeURIComponent
   *
   * @param {string} string The data being decoded
   * @return {Array.<number>} The decoded array
   */
  urlDecode: (string) => urlDecode(string),

  /**
   * Encode a character code array to Base64 encoded string
   *
   * @param {Array.<number>|TypedArray} data The data being encoded
   * @return {string} The Base64 encoded string
   */
  base64Encode: (data) => Encoding.base64Encode(data),

  /**
   * Decode a Base64 encoded string to character code array
   *
   * @param {string} string The data being decoded
   * @return {Array.<number>} The decoded array
   */
  base64Decode: (string) => Encoding.base64Decode(string),

  /**
   * Joins a character code array to string
   *
   * @param {Array.<number>|TypedArray} data The data being joined
   * @return {String} The joined string
   */
  codeToString: (data) => Encoding.codeToString(data),

  /**
   * Splits string to an array of character codes
   *
   * @param {string} string The input string
   * @return {Array.<number>} The character code array
   */
  stringToCode: (string) => Encoding.stringToCode(string),

  /**
   * 全角英数記号文字を半角英数記号文字に変換
   *
   * Convert the ascii symbols and alphanumeric characters to
   *   the zenkaku symbols and alphanumeric characters
   *
   * @example
   *   console.log(Encoding.toHankakuCase('Ｈｅｌｌｏ Ｗｏｒｌｄ！ １２３４５'));
   *   // 'Hello World! 12345'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toHankakuCase: (data) => Encoding.toHankakuCase(data),

  /**
   * 半角英数記号文字を全角英数記号文字に変換
   *
   * Convert to the zenkaku symbols and alphanumeric characters
   *  from the ascii symbols and alphanumeric characters
   *
   * @example
   *   console.log(Encoding.toZenkakuCase('Hello World! 12345'));
   *   // 'Ｈｅｌｌｏ Ｗｏｒｌｄ！ １２３４５'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toZenkakuCase: (data) => Encoding.toZenkakuCase(data),

  /**
   * 全角カタカナを全角ひらがなに変換
   *
   * Convert to the zenkaku hiragana from the zenkaku katakana
   *
   * @example
   *   console.log(Encoding.toHiraganaCase('ボポヴァアィイゥウェエォオ'));
   *   // 'ぼぽう゛ぁあぃいぅうぇえぉお'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toHiraganaCase: (data) => Encoding.toHiraganaCase(data),

  /**
   * 全角ひらがなを全角カタカナに変換
   *
   * Convert to the zenkaku katakana from the zenkaku hiragana
   *
   * @example
   *   console.log(Encoding.toKatakanaCase('ぼぽう゛ぁあぃいぅうぇえぉお'));
   *   // 'ボポヴァアィイゥウェエォオ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toKatakanaCase: (data) => Encoding.toKatakanaCase(data),

  /**
   * 全角カタカナを半角ｶﾀｶﾅに変換
   *
   * Convert to the hankaku katakana from the zenkaku katakana
   *
   * @example
   *   console.log(Encoding.toHankanaCase('ボポヴァアィイゥウェエォオ'));
   *   // 'ﾎﾞﾎﾟｳﾞｧｱｨｲｩｳｪｴｫｵ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toHankanaCase: (data) => Encoding.toHankanaCase(data),

  /**
   * 半角ｶﾀｶﾅを全角カタカナに変換 (濁音含む)
   *
   * Convert to the zenkaku katakana from the hankaku katakana
   *
   * @example
   *   console.log(Encoding.toZenkanaCase('ﾎﾞﾎﾟｳﾞｧｱｨｲｩｳｪｴｫｵ'));
   *   // 'ボポヴァアィイゥウェエォオ'
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toZenkanaCase: (data) => Encoding.toZenkanaCase(data),

  /**
   * 全角スペースを半角スペースに変換
   *
   * Convert the em space(U+3000) to the single space(U+0020)
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toHankakuSpace: (data) => Encoding.toHankakuSpace(data),

  /**
   * 半角スペースを全角スペースに変換
   *
   * Convert the single space(U+0020) to the em space(U+3000)
   *
   * @param {Array.<number>|TypedArray|string} data The input unicode data
   * @return {Array.<number>|string} The conveted data
   */
  toZenkakuSpace: (data) => Encoding.toZenkakuSpace(data),
}
