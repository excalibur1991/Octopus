/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const extraNodeModules = require('node-libs-browser');

module.exports = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve("react-native-crypto"),
      //fs: require.resolve("expo-file-system"),
      fs: require.resolve("react-native-level-fs"),
      http: require.resolve("@tradle/react-native-http"),
      https: require.resolve("https-browserify"),
      net: require.resolve("react-native-tcp"),
      os: require.resolve("react-native-os"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      vm: require.resolve("vm-browserify")
    },
    sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs']
  },	
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
