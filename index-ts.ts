import {
    createWalletClient,
    custom,
    createPublicClient,
    parseEther,
    formatEther,
    defineChain,
    WalletClient,
    PublicClient,
    Chain,
    Address
} from "viem"
import "viem/window"
import { contractAddress, coffeeAbi } from "./constants-ts"

const connectButton = document.getElementById("connectButton") as HTMLButtonElement
const fundButton = document.getElementById("fundButton") as HTMLButtonElement
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement
const balanceButton = document.getElementById("balanceButton") as HTMLButtonElement
const withdrawButton = document.getElementById("withdrawButton") as HTMLButtonElement
const getAddressToAmountFundedButton = document.getElementById("getAddressToAmountFundedButton") as HTMLButtonElement

console.log("I love web3 and blockchain development!")

let walletClient: WalletClient | undefined
let publicClient: PublicClient | undefined

async function connect(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        connectButton.innerHTML = "Connected!"
    } else {
        connectButton.innerHTML = "You must install MetaMask!"
    }
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
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

async function fund(): Promise<void> {
    const ethAmount = ethAmountInput.value
    console.log(`Funding with ${ethAmount}...`)

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient)

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        console.log(parseEther(ethAmount))

        const { request } = await publicClient.simulateContract({
            address: contractAddress as Address,
            abi: coffeeAbi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),
        })
        console.log(request)

        const hash = await walletClient.writeContract(request)
        console.log(hash)
    } else {
        connectButton.innerHTML = "You must install MetaMask!"
    }
}

async function withdraw(): Promise<void> {
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
            address: contractAddress as Address,
            abi: coffeeAbi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
        })
        console.log(request)

        const hash = await walletClient.writeContract(request)
        console.log(hash)
    } else {
        connectButton.innerHTML = "You must install MetaMask!"
    }
}

async function getAmount(): Promise<void> {
    console.log("Showing amount funded")
    try {
        if (typeof window.ethereum !== "undefined") {
            walletClient = createWalletClient({
                transport: custom(window.ethereum)
            })
            const [connectedAccount] = await walletClient.requestAddresses()
            const currentChain = await getCurrentChain(walletClient)

            publicClient = createPublicClient({
                chain: currentChain,
                transport: custom(window.ethereum)
            })
            const amountFunded = await publicClient.readContract({
                address: contractAddress as Address,
                abi: coffeeAbi,
                functionName: "getAddressToAmountFunded",
                args: [connectedAccount],
            }) as bigint
            getAddressToAmountFundedButton.innerHTML = (`Amount you funded: ${formatEther(amountFunded)} Ethereum`)

        } else {
            connectButton.innerHTML = "You must install MetaMask!"
        }
    } catch (error: any) {
        console.error("Error in getAmount", error)
        getAddressToAmountFundedButton.innerHTML = `Error: ${error.shortMessage || error.message || 'Unknown error'}`
    }
}

async function getbalance(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const balance = await publicClient.getBalance({
            address: contractAddress as Address
        })
        console.log(formatEther(balance))
        balanceButton.innerHTML = `Coffee funds balance ${formatEther(balance)} Ethereum`
    }
}

connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getbalance
withdrawButton.onclick = withdraw
getAddressToAmountFundedButton.onclick = getAmount