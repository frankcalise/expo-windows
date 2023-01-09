/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const fs = require("fs");
const path = require("path");
const exclusionList = require("metro-config/src/defaults/exclusionList");
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve("react-native-windows/package.json"), "..")
);

// default expo config
const config = getDefaultConfig(__dirname);

// react-native-windows config
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

config.resolver.blockList = exclusionList([
  // This stops "react-native run-windows" from causing the metro server to crash if its already running
  new RegExp(`${path.resolve(__dirname, "windows").replace(/[/\\]/g, "/")}.*`),
  // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
  new RegExp(`${rnwPath}/build/.*`),
  new RegExp(`${rnwPath}/target/.*`),
  /.*\.ProjectImports\.zip/,
]);

module.exports = config;
