const path = require('path');

module.exports = ({ file }) => {
  // 默认UI组件为Vant组件，标准宽度请根据设计稿的尺寸来配置
  const designWidth = file && file.dirname && file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,
        unitPrecision: 3,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  };
};
