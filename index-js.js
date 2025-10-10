import { createWalletClient, custom, createPublicClient, parseEther, formatEther, defineChain } from "https://esm.sh/viem"
import { contractAddress, coffeeAbi } from "./constants-js.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const ethAmountInput = document.getElementById("ethAmount")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
const getAddressToAmountFundedButton = document.getElementById("getAddressToAmountFundedButton")

let walletClient
let publicClient

async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    })
    return currentChain
}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        connectButton.innerHTML = "Connected!"
    } else {
        connectButton.innerHTML = "Install MetaMask"
    }

}

async function fund() {
    const ethAmount = ethAmountInput.value
    console.log(`Funding with ${ethAmount}...`)

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [ConnectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        console.log(parseEther(ethAmount))

        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "fund",
            account: ConnectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),

        })
        console.log(request)

        const hash = await walletClient.writeContract(request)
        console.log(hash)
    } else {
        connectButton.innerHTML = "Install MetaMask"
    }


}

async function withdraw() {
    console.log("withdrawing funds...")
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
        })
        console.log(request)

        const hash = await walletClient.writeContract(request)
        console.log(hash)
    } else {
        connectButton.innerHTML = "Install MetaMask"
    }
}

async function getAmount() {
    console.log("Showing amount funded")
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const amountFunded = await publicClient.readContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "getAddressToAmountFunded",
            args: [connectedAccount],
        })
        getAddressToAmountFundedButton.innerHTML = (`Amount funded: ${formatEther(amountFunded)} Ethereum`)

    } else {
        connectButton.innerHTML = "Install MetaMask"
    }
}

async function getbalance() {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const balance = await publicClient.getBalance({
            address: contractAddress
        })
        console.log(formatEther(balance))
        balanceButton.innerHTML = `Balance: ${formatEther(balance)} ETH`
    } else {
        balanceButton.innerHTML = "Install MetaMask"
    }
}

connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getbalance
withdrawButton.onclick = withdraw
getAddressToAmountFundedButton.onclick = getAmount