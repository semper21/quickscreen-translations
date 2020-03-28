// C. Oakman - 27 Mar 2020
// Continuous integration testing script

const assert = require('assert')
const fs = require('fs')

const parseEDN = require('edn-to-js')
const glob = require('glob')

// sanity-check: english dictionary must exist
if (!fs.existsSync('en.edn')) {
  console.error('[ERROR] en.edn file must exist')
  process.exit(1)
}

// read all the dictionary files into memory
const allDictionaryFiles = glob.sync('*.edn')

// const dictionaries = {}
// for (let i = 0; i < allDictionaryFiles.length; i++) {
//   const filename = allDictionaryFiles[i]
//   const langKey = filename.replace('.edn', '')
//   const fileContents = readFileSync(filename)
//
//   let dictObj = null
//   try {
//     dictObj = parseEDN(fileContents)
//   } catch (e) {
//     // all EDN files must be valid syntax
//     console.error('[ERROR] ' + filename + ' is not valid EDN syntax')
//     process.exit(1)
//   }
//
//   dictionaries[langKey] = fileContents
// }

const keywordRegex = /:[a-zA-Z0-9\-./]+/g

function getResourceIdFromLine (line) {
  const x = line.match(keywordRegex)
  console.log(x)
  if (x.length >= 1) return x[0]
  return false
}

assert(getResourceIdFromLine('    :landing-page  ') === ':landing-page')
assert(getResourceIdFromLine('    :landing-page "Las personas enfermas deben quedarse en casa. "   ') === ':landing-page')
assert(getResourceIdFromLine('    :landing-page/anyone-who-is-sick "Las personas enfermas deben quedarse en casa. "   ') === ':landing-page/anyone-who-is-sick')
assert(getResourceIdFromLine('   ;; FIXME :location-panel/please-enter-valid-zip "Please enter a valid ZIP code."   ') === ':location-panel/please-enter-valid-zip')

// parse the dictionary files to make sure everything lines up

// TODO:
// - one definition per line
// - languages should match english dictionary

// -----------------------------------------------------------------------------
// Helpers

function readFileSync (filename) {
  return fs.readFileSync(filename, 'utf8')
}

function parseLine (line) {
  const arr = line.split(' ')
}
