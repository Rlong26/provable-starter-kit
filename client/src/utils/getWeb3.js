import Web3 from 'web3'
import { waitUntilPageLoaded } from './utils.js'

const LOCAL_HOST_WEB3 = 'http://0.0.0.0:8545'
const FALLBACK_WEB3_PROVIDER = process.env.REACT_APP_NETWORK || LOCAL_HOST_WEB3

const getInjectedEthereumWeb3 = _ =>
  window.ethereum.enable()
    .then(_ => new Web3(window.ethereum))

const getLocalWeb3 = _ =>
  new Web3(new Web3.providers.HttpProvider(FALLBACK_WEB3_PROVIDER))

export const getWeb3 = () =>
  waitUntilPageLoaded()
    .then(_ =>
        window.ethereum
          ? getInjectedEthereumWeb3()
          : window.web3
            ? window.web3
            : getLocalWeb3()
      )
    .catch(_e => console.error('Error getting web3!', _e))

export const getGanacheWeb3 = _ =>
  process.env.NODE_ENV !== 'production'
    ? new Web3(new Web3.providers.HttpProvider(LOCAL_HOST_WEB3))
    : null
