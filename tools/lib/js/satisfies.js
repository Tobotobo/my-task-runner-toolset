import * as compare_versions from './compare-versions/index.js'
import * as aec from './ansi-escape-code.js'

const version = scriptArgs[1].match(/\d+\.\d+\.\d+/).toString();
const range = scriptArgs[2];
const result = compare_versions.satisfies(version, range);

var output = ""
if (result) {
  output += `${aec.green}[OK`
} else {
  output += `${aec.red}[NG`
}
output += `] version: ${version} range: ${range}${aec.reset}`;
console.log(output);
