module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], // 以当前node版本为基础做转化
    '@babel/preset-typescript'
  ],
};