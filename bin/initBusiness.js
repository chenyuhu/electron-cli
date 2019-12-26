const path = require('path')
const ncp = require('ncp')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const { Business } = require('./Question')
const generator = require('../lib/generator.js')

const error = chalk.red
const warning = chalk.keyword('orange')
const success = chalk.greenBright

module.exports = async (projectName) => {
  const templateDir = path.resolve(__dirname, '../template/business')
  const projectDir = `${process.cwd()}/${projectName}`
  const answers = await inquirer.prompt(Business)
  const spinner = ora(warning('项目创建中...'))
  spinner.start()
  ncp(templateDir, projectDir, async (err) => {
    await generator(
      {
        name: projectName,
        ...answers,
      },
      projectDir
    )
    console.log('\r')
    spinner.succeed(success('项目创建成功'))
    spinner.info(`${success(`Now you can start project with`)} cd ${projectName} && yarn install`)
  })
}
