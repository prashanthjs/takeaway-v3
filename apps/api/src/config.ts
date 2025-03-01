import * as process from 'process';

export const config = {
  globalPrefix: '/api',
  databaseUrl: process.env.DATABASE_URL ?? '',
  corsRegex: process.env.CORS_REGEX,
  port: Number(process.env.PORT ?? 4000),
  whatsapp: {
    senderId: process.env.WA_SENDER_NUMBER_ID,
    accessToken: process.env.WA_ACCESS_TOKEN,
    verifyToken: process.env.WA_VERIFY_TOKEN,
    apiVersion: process.env.WA_API_VERSION,
    debug: process.env.OPENAI_DEBUG === 'true',
    apiBaseUrl: 'https://graph.facebook.com',
  },
  meta: {
    apiBaseUrl: process.env.META_API_BASE_URL,
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY,
    primaryModel: process.env.OPENAI_PRIMARY_MODEL_NAME,
    secondaryModel: process.env.OPENAI_SECONDARY_MODEL_NAME,
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL_NAME,
  },
  langchain: {
    apiKey: process.env.LANGCHAIN_API_KEY,
    debug: process.env.LANGCHAIN_DEBUG === 'true',
    endpoint: process.env.LANGCHAIN_ENDPOINT,
    tracingV2: process.env.LANGCHAIN_TRACING_V2 === 'true',
    project: process.env.LANGCHAIN_PROJECT,
  },
  searchIndex: {
    product: process.env.SEARCH_INDEX_PRODUCT,
  },
};
