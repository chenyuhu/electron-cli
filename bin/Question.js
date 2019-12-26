module.exports = [
  {
    name: 'name',
    type: 'input',
    message: 'Please enter a project name',
    default: 'electronVueTemplate',
    validate: (val) => {
      if (!val) {
        return 'Project name is required'
      }
      return true
    },
  },
  {
    name: 'version',
    type: 'input',
    message: 'Please enter the version',
    default: '0.0.1',
    validate: (version) => {
      const rex = /^\d+.\d+.\d+(\w+)?$/
      if (!rex.test(version)) {
        return 'Incorrect version format'
      }
      return true
    },
  },
  {
    name: 'author',
    type: 'input',
    message: 'Please enter author',
  },
  {
    name: 'description',
    type: 'input',
    message: 'What is your description',
  },
  {
    name: 'license',
    type: 'list',
    message: 'please choose license',
    choices: ['MIT', 'ISC', 'null'],
  },
]
