#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const question = require('./Question')

inquirer.prompt(question).then((answers) => {
  console.log('======================================')
  console.log(answers)
  console.log('======================================')
})
