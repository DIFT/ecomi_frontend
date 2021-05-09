import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://alienbuild.uk/api' : 'http://localhost:8000/api'
export const APP_NAME = publicRuntimeConfig.APP_NAME

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT