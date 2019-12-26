const chalk = require('chalk')

const error = chalk.red
const Component = [
  {
    type: 'scope',
    message: '请输入Npm Scope',
    name: 'scope',
    default: 'sishu',
  },
  {
    type: 'version',
    message: '初始版本',
    name: 'version',
    default: '0.0.0',
  },
  {
    type: 'description',
    message: '请输入组件描述',
    name: 'description',
  },
  {
    type: 'author',
    message: '请输入作者姓名',
    name: 'author',
    validate: (input) => {
      if (/[/\\]/im.test(input)) {
        console.log(` ${error('姓名不能包含特殊字符')}`)
        return false
      }
      return true
    },
  },
  {
    type: 'url',
    message: '请输入作者博客链接',
    name: 'url',
  },
  {
    type: 'email',
    message: '请输入作者邮箱',
    name: 'email',
  },
]
const Business = [
  {
    type: 'version',
    message: '初始版本',
    name: 'version',
    default: '0.0.0',
  },
  {
    type: 'description',
    message: '请输入项目描述',
    name: 'description',
  },
  {
    type: 'author',
    message: '请输入作者姓名',
    name: 'author',
    validate: (input) => {
      if (/[/\\]/im.test(input)) {
        console.log(` ${error('姓名不能包含特殊字符')}`)
        return false
      }
      return true
    },
  },
  {
    type: 'url',
    message: '请输入作者博客链接',
    name: 'url',
  },
  {
    type: 'email',
    message: '请输入作者邮箱',
    name: 'email',
  },
]
module.exports = { Component, Business }
