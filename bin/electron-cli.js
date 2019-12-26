#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const shell = require('shelljs')
const execSh = require('exec-sh')
const npmPrefix = require('global-prefix')
const pkg = require('../package.json')
const initBusiness = require('./initBusiness.js')
const initComponent = require('./initComponent.js')

const templates = ['business', 'component']

const shellDir =
  os.platform() === 'darwin'
    ? `${npmPrefix}/lib/node_modules/@hulkbuster/shell`
    : `${npmPrefix}\\node_modules\\@hulkbuster\\shell`

// 查看版本
program.version(pkg.version, '-v, --version').description('Powerful Cli For hulkbuster')

// 创建模块
program
  .command('create <projectName>')
  .option('-t, --template <templateName>')
  .description('create hulkbuster modules')
  .action(async (projectName, options) => {
    if (!options.template || templates.indexOf(options.template) === -1 || options.template === undefined) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          message: 'Please select a template',
          name: 'template',
          choices: templates,
        },
      ])
      if (answers.template === 'business') {
        initBusiness(projectName)
      } else if (answers.template === 'component') {
        initComponent(projectName)
      }
    } else if (options.template === 'business') {
      initBusiness(projectName)
    } else if (options.template === 'component') {
      initComponent(projectName)
    }
  })

// 链接上router路由
program
  .command('link')
  .description('link your local project route to @hulkbuster/routes')
  .action((options) => {
    try {
      const { name } = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString())
      const pkgStr = fs.readFileSync(`${shellDir}/node_modules/@hulkbuster/routes/package.json`).toString()
      if (pkgStr.indexOf(name) === -1) {
        console.log('Warning: The library is not registered,Please notify @hulkbuster/routes maintainers to register!')
      } else {
        execSh(`wml add ${process.cwd()} ${shellDir}/node_modules/${name}`)
      }
    } catch (error) {
      console.log('Error: Please download @hulkbuster/shell')
    }
  })

// 打开调试
program
  .command('dev')
  .description('debugging @hulkbuster/shell')
  .action(() => {
    shell.cd(shellDir)
    execSh('wml start')
    execSh('yarn dev')
  })

// 在本地打包
program
  .command('build')
  .description('build @hulkbuster/shell')
  .action(() => {
    shell.cd(shellDir)
    execSh('wml start')
    execSh('yarn build')
  })

// 执行hulkbuster的命令
program
  .command('run <command>')
  .description('Execute hulkbuster command')
  .action((command) => {
    shell.cd(shellDir)
    execSh(`yarn ${command}`)
  })

// 开始监听模块
program
  .command('start')
  .description('Start listening module')
  .action(() => {
    execSh(`wml start`)
  })

// 显示所有的link
program
  .command('list')
  .alias('ls')
  .description('Show all links')
  .action(() => {
    execSh(`wml list`)
  })

// 清除所有link
program
  .command('clean')
  .description('Clear all links')
  .action(() => {
    execSh(`wml rm all`)
    execSh(`watchman watch-del-all`)
  })
// 解析命令行参数
program.parse(process.argv)
