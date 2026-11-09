# Theta Vibes: Frontend

The website and web3 app for the Theta Vibes NFT project on the Theta blockchain. Visitors can browse the collections; holders can connect a wallet, mint, stake NFTs, track unclaimed rewards, and collect the GOT reward token.

Part of the **Theta Vibes / Guardian of Theta** project: [frontend](https://github.com/davinharding/guardian-of-theta-frontend) · [NFT staking contracts](https://github.com/davinharding/staking-guardina-of-theta) · [GOT reward airdropper](https://github.com/davinharding/GOTAirdropper)

Live (when deployed): [thetavibes.io](https://www.thetavibes.io)

## Features

- **Wallet connection** with account modal and network-aware contract calls (ethers.js).
- **Staking dashboard.** Approve, deposit and withdraw NFTs per collection, with batched multi-transaction flows.
- **Live rewards.** Reads accrued rewards on-chain and claims them in one click.
- **GOT collection** page backed by the Merkle-proof [airdropper contract](https://github.com/davinharding/GOTAirdropper).
- **Minting** and collection gallery pages.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

## Stack

Next.js 12 · React 17 · ethers.js 5 · Material UI (built on a Creative Tim kit) · Vercel

## Layout

```text
pages/            index, staking, collect-got, entertainment
web3/             wallet, contract hooks (useReadFunction, useCalculateRewards...), staking + mint buttons, ABIs and addresses
components/       UI building blocks
```

---

<sub>Built by [Davin Harding](https://davin.io) · More at [github.com/davinharding](https://github.com/davinharding)</sub>
