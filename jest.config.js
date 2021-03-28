module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ["svelte-jester", { "preprocess": true }],
  },
  testPathIgnorePatterns: ["node_modules/?!(svelte-routing)"],
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/scripts/setupTest.js']
}
