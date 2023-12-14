/*
 * @Author: wuxudong wuxudong@zbnsec.com
 * @Date: 2022-11-15 01:13:46
 * @LastEditors: wuxudong 953909305@qq.com
 * @LastEditTime: 2023-12-14 15:07:39
 * @Description:
 */
module.exports = {
  root: true,
  extends: ['react-app'],
  rules: {},
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      plugins: ['react'],
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],

        'react-hooks/exhaustive-deps': 'off',
        'jsx-a11y/anchor-is-valid': 'off', //注销a标签的警告
        'no-debugger': 0,
        'default-case': 1, // 要求 switch 语句中有 default 分支
        'no-empty-function': 1, // 禁止出现空函数
        'no-multi-spaces': 1, // 禁止使用多个空格
        ' no-useless-escape': 'off',
        'no-multiple-empty-lines': [
          // 禁止出现多行空行
          'error',
          { max: 3 },
        ],
      },
    },
  ],
};
