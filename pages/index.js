import React from 'react';

import { DAppProvider, Theta } from '@usedapp/core';
// import ReactDOM from 'react-dom';

import Base from './base';
import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody"

const config = {
  readOnlyChainId: Theta.chainId,
  readOnlyUrls: {
    [Theta.chainId]: 'https://eth-rpc-api.thetatoken.org/rpc',
  },
};

const Index = () => (
    <DAppProvider config={config}>
      <Base bodyComponent={<LandingPageBody />} />
    </DAppProvider>
);

export default Index;
