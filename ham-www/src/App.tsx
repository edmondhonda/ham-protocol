import React, { useCallback, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'

import DisclaimerModal from './components/DisclaimerModal'

import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import HamProvider from './contexts/HamProvider'
import TransactionProvider from './contexts/Transactions'

import useModal from './hooks/useModal'

import FAQ from './views/FAQ'
import Farms from './views/Farms'
import Home from './views/Home'
import Page from './components/Page'

import theme from './theme'

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Page>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
          </Switch>
        </Page>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider 
        chainId={1}   
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          walletlink: {
            url: 'https://test.com',
            appName: 'Ham Finance',
            appLogoUrl: 'https://hami.fy',
          },
        }}>
        <HamProvider>
          <TransactionProvider>
            <ModalsProvider>
              <FarmsProvider>
                {children}
              </FarmsProvider>
            </ModalsProvider>
          </TransactionProvider>
        </HamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {

  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(<DisclaimerModal onConfirm={markSeen} />)

  useEffect(() => {
    const seenDisclaimer = localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return (
    <div />
  )
}

export default App
