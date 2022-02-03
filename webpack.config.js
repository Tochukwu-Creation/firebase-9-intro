const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js', //where we want webpack to look for our js source file - relative path
    output: {
        path: path.resolve(__dirname, 'dist'), // path to whatever folder or dir where we want the dir to be. this is required because we need an absolute path not relative
        filename: 'bundle.js' // specfied filename for the output file
    }, 
    watch: true // auto-bundle code into the bumdle.js file
}