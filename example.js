// import * as os from './lib/js/qjs-os.js';
import { $ } from './lib/js/qjs-shell.js';

const result = $`echo あいうえお`;
console.log(result);

// console.log(os.platform == os.platforms.win32);
