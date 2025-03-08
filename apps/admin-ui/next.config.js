//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');
const { withSentryConfig } = require('@sentry/nextjs');

const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
};

const sentryConfigOptions = {
  org: 'prasoni-takeaway',
  project: 'takeaway-admin-ui',
  silent: false,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

/**
 *
 * @param {import('@nx/next/plugins/with-nx').WithNxOptions} passedConfig
 * @returns
 */
const sentryEnhancedConfig = passedConfig => withSentryConfig(passedConfig, sentryConfigOptions);

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNextIntl,
  // sentryEnhancedConfig,
];
module.exports = composePlugins(...plugins)(nextConfig);
