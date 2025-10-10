# Welcome to my Fund my journey website!

This is a minimal website to learn how to use HTML with javascript and typescript to connect a website to a FundMe smart contract. This allows people to fund a smart contract I learned how to build with cyfrin updraft that only the owner can withdraw from and has a function that uses a mapping that ties the funder to the amount funded for viewing who funded how much.

https://github.com/matcherbudz/foundry-fund-me-f25

# Note: the constants-ts.ts is hardcoded with the anvil fundme contract address and abi, if you want to test with a fundme contract deployed to sepolia change the contract address in the contants-ts.ts

There are 2 different ways to run this codebase. 

1. Javascript Edition

2. Typescript Edition

# Setup (Both Javascript and Typescript Editions)

## Requirements

- [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  - A way to deploy your website to a temporary server to view and interact with.
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've installed it right if you can run: `git --version`
- [Metamask](https://metamask.io/)
  - This is a browser extension that lets you interact with the blockchain.
- [anvil](https://book.getfoundry.sh/reference/anvil/)
  - You'll know you've installed it right if you can run: `anvil --version` 

## Quickstart

1. Clone the repository

```bash
git clone https://github.com/matcherbudz/html-ts-fundmyjourney-cu
cd html-ts-fundmyjourney-cu
```

2. Run the following command or pnpm anvil:

```bash
anvil --load-state fundme-anvil.json 
```

This will load a local blockchain with our smart contract already deployed.

3. Import the anvil key into your Metamask

When you run the `anvil` command from #1, it'll give you a list of private keys. [Import one into your metamask.](https://support.metamask.io/start/how-to-import-an-account/)

You'll now have a wallet with some funds associated with our anvil chain!

4. Add the anvil chain to your metamask

[Follow this](https://support.metamask.io/configure/networks/how-to-add-a-custom-network-rpc/) and use:
- Network name: Anvil
- New RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH
- Block Explorer URL: None

### Javascript Edition 

After doing the setup above, do the following

#### Quickstart

1. Run the liveserver either click the Go Live button in your vscode or right click the index.html and open with live server

http://localhost:5500/

You should now see the website and test its functionality. Connecting a wallet, checking the FuneMe contract total balance, a Send me ETH form where people can send the contract ETH, and a management section for the owner to withdraw and for anyone who funded the contract to see how much they funded.

### Typescript Edition

After doing the setup from above, do the following

#### Requirements

- All the requirements for the [Javascript Edition](#requirements)
- [pnpm](https://pnpm.io/)
  - You'll know you've installed it right if you can run:`pnpm --version`
- [Node.js](https://nodejs.org/en/)
  - You'll know you've installed it right if you can run: `node --version`
- [vite](https://vite.dev/)
  - Vite is a blazing fast frontend build tool `vite --version`

#### Quickstart

1. Install the dependencies

```bash
pnpm install
```
The shortcut to comment and uncomment a line in wsl for use is `ctrl + /`
2. Uncomment the line with `index-ts.ts` line in your `index.html` file, and comment out the line with `index-js.js`. Like this:

```html
<!-- <script src="./index-js.js" type="module"></script> -->
<script src="./index-ts.ts" type="module"></script>
```

3. Run the following command:

```bash
pnpm vite
```

3. Open your browser to whatever the command above says, ie: `http://localhost:5173/`

Again the website should be working and you can test the functionality.
