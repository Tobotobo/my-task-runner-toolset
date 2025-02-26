import { $ } from '../lib/js/qjs-shell.js';

const result = $`echo あいうえお`;
// const result = $`ls | grep *.js`;
console.log(result);
