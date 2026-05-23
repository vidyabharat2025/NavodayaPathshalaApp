/**
 * useAppVersion Hook
 * Retrieves app version and build number dynamically
 * Reads from package.json (version) and app.json (buildNumber)
 */

import { useMemo } from 'react';

const useAppVersion = () => {
  const versionInfo = useMemo(() => {
    try {
      // Import package.json to get the version
      const packageJson = require('../../package.json');
      const version = packageJson.version;

      // Import app.json to get the build number
      const appJson = require('../../app.json');
      const buildNumber = appJson.buildNumber || 1;

      return {
        version,
        buildNumber,
        fullVersion: `Version ${version} (Build ${buildNumber})`,
      };
    } catch (error) {
      console.warn('Failed to load version info:', error);
      return {
        version: 'Unknown',
        buildNumber: 'Unknown',
        fullVersion: 'Version Unknown (Build Unknown)',
      };
    }
  }, []);

  return versionInfo;
};

export default useAppVersion;
