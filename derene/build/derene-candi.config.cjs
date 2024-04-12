const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = require('../../webpack.config.cjs');

const newConfig = baseConfig();

// modifications for derene-candi
const outputDir = path.join(__dirname, "../../../derene-candi/resumeEditor/static/dokieliMod");

newConfig.output.path = path.join(outputDir, "/scripts");
newConfig.output.filename = "derene-candi-dokieli.js";

const assetsFolderName = "media";
newConfig.plugins.push(new CopyPlugin({
    patterns: [{
        from: path.join(__dirname, "../../", assetsFolderName),
        to: path.join(outputDir, assetsFolderName)
    }],
}));


module.exports = (env) => {
    return newConfig;
}