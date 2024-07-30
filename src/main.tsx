import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './index.css'

import { ContainerProvider } from 'brandi-react';
import { APIProvider } from './context/APIContext';
import { AuthProvider } from './context/AuthContext';
import { routeTree } from './routeTree.gen'
import container from './di/containers';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './components/Loading';

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ContainerProvider container={container}>
            <APIProvider>
              <AuthProvider>
                <Theme>
                  <RouterProvider router={router} />
                </Theme>
              </AuthProvider>
            </APIProvider>
          </ContainerProvider>
        </PersistGate>
      </Provider>
    </StrictMode>,
  )
}
