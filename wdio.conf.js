exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'vferreirap_9iJfD4',
  key: process.env.BROWSERSTACK_ACCESS_KEY || '3z1ef9XQk5qLrtGmKLRV',
  hostname: 'hub.browserstack.com',
  services: [
    [
      'browserstack',
      {
        app: 'bs://4ba9106edeab22639228de19c87dfde48ef26129',
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
