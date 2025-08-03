/* eslint-disable @typescript-eslint/no-require-imports */

// Import the fs module with promises
const fs = require("fs/promises")
const path = require("path")

const localesDir = path.resolve(__dirname, "./src/lib/locales")

// Function to sort a JSON object by key
const sortObjectByKey = json => {
  return Object.keys(json)
    .sort()
    .reduce((obj, key) => {
      if (typeof json[key] === "object") {
        obj[key] = sortObjectByKey(json[key])
      } else {
        obj[key] = json[key]
      }
      return obj
    }, {})
}

// Read the contents of the 'locales' folder
fs.readdir(localesDir).then(dirs => {
  // Iterate over each directory in 'locales'
  dirs.forEach(dir => {
    const commonJsonPath = path.join(localesDir, dir, "common.json")

    // Read the content of the common JSON file in each directory
    fs.readFile(commonJsonPath, "utf-8")
      .then(data => {
        const json = JSON.parse(data)

        // Sort the JSON object by key
        const sorted = sortObjectByKey(json)

        // Write the sorted JSON back to the same file
        return fs.writeFile(
          commonJsonPath,
          JSON.stringify(sorted, null, 2) + "\n",
          "utf-8"
        )
      })
      .catch(err => {
        console.error(`Error reading or writing file: ${commonJsonPath}`, err)
      })
  })
})