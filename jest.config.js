module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ["svelte-jester", { "preprocess": true }],
  },
  testPathIgnorePatterns: ["node_modules/?!(svelte-routing)"],
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: ['<rootDir>/scripts/setupTest.js'],
  coverageReporters: ["json", "html", "text", "text-summary"],
  collectCoverageFrom: [
    "**/*.{js,svelte}",
    "!**/node_modules/**",
  ]
}
