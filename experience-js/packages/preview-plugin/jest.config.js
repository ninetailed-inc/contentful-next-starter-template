module.exports = {
  displayName: 'experience-sdk-preview-experience-sdk-preview',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../coverage/libs/experience-sdk/preview/experience-sdk-preview',
};
