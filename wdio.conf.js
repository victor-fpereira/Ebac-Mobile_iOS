exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'vferreirap_GyQMjg',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'kfsqzgxbcj1rcpbiMLyu',
  hostname: 'hub.browserstack.com',
  services: [
    [
      'browserstack',
      {
        app: 'bs://6982f3610a5abc06b3ad57608441152accf1fcad',
        buildIdentifier: "${BUILD_NUMBER}",
        browserstackLocal: true
      },
    ],
    ['appium']
  ],
  capabilities: [{
    'bstack:options': {
      deviceName: 'iPhone 12 Pro',
      platformVersion: '14',
      platformName: 'ios',
    }
  }],

  beforeSuite: async function () {
  // Check if the app is open and running
    let state = await driver.queryAppState("br.art.ebaconline")
    if (state !== 4) {
       await driver.launchApp()
    }
  },

  afterSuite: async function () {
  // Close the app
      await driver.closeApp()
  },

  logLevel: 'info',

  waitforTimeout: 20000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  specs: [
    './tests/specs/**/*.js'
  ],

  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 1
}
