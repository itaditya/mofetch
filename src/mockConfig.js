const mockConfig = {
  isInitialized: false,
  delay: process.env.NODE_ENV === 'development' ? 400 : 0,
};

export function setConfig(config) {
  Object.assign(mockConfig, config);
}

export function getConfig() {
  return mockConfig;
}
