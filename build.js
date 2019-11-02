const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
let exampleDirs = [];
const srcDir=path.join(__dirname,'src')
try {
  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    var stat = fs.lstatSync(path.join(srcDir,file));
    if (file.indexOf(".") === 0) {
      return true;
    }
    if (stat.isDirectory()) {
      exampleDirs.push(file);
    }
  });
} catch (err) {
  console.log(err);
}
console.log(exampleDirs);
const entryOptions = {};
exampleDirs.map(filePath => {
  entryOptions[path.basename(filePath)] = path.join(
    srcDir,
    filePath,
    "index.js"
  );
});

const compiler=webpack(
  {
    entry: entryOptions,
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
  }
);
/*

  (err, stats) => {
    // Stats Object
    if (err || stats.hasErrors()) {
      // Handle errors here
      stats.compilation.errors.forEach(err=>{
          console.log(err.message)
      })

    }
    // Done processing
  }
*/
const watching = compiler.watch({
    // Example watchOptions
    aggregateTimeout: 300,
    poll: undefined
  }, (err, stats) => { // Stats Object
    // Print watch/build result here...
    if(err){
        console.log(err.message);
    }else{
        if(stats && stats.hasErrors()){
            console.log(stats);
        }
    }
  });