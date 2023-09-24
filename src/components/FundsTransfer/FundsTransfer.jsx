import { BigNumber } from 'ethers'
import { Button, Container, Form } from 'react-bootstrap'
import './fundsTransfer.scss'
import { useEffect, useState } from 'react'
const TOKEN_ADDRESS = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const ERC20ABI = require('../../abi.json')

const FundsTransfer = () => {
    const [token, setToken] = useState(0)
    const ethers = require('ethers')
    const [walletAddress, setWalletAddress] = useState(0)
    const [receiverAddress, setReceiverAddress] = useState('')
    const [amount, setAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    const amountt = parseInt(amount)

    async function transferTokens() {
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const walletAddress = await signer.getAddress()
        setWalletAddress(walletAddress)

        let balance
        try {
            const tokenTokenContract = await new ethers.Contract(TOKEN_ADDRESS, ERC20ABI, provider)
            const BigNumberAmount = BigNumber.from(amountt).mul(10).pow(18)
            await tokenTokenContract.connect(signer).transfer(receiverAddress, BigNumberAmount)
            balance = await tokenTokenContract.balanceOf(walletAddress)
            balance = ethers.utils.formatEther(balance, 18)
            setBalance(balance)
        } catch (error) {
            console.error('Error fetching TOKEN balance:', error)
        }
    }

    useEffect(() => {
        async function readBalance() {
            const provider = await new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const walletAddress = await signer.getAddress()
            setWalletAddress(walletAddress)

            let balance
            try {
                const tokenTokenContract = await new ethers.Contract(TOKEN_ADDRESS, ERC20ABI, provider)
                balance = await tokenTokenContract.balanceOf(walletAddress)
                balance = ethers.utils.formatEther(balance, 18)
                setBalance(balance)
            } catch (error) {
                console.error('Error fetching TOKEN balance:', error)
            }
        }
        readBalance()
    }, [])

    return (
        <Container className="center-container">
            <div>Balance: {balance}</div>
            <Button onClick={transferTokens} variant="primary">
                Transfer tokens
            </Button>
            <Form.Control type="number" placeholder="0.001" min="0" onChange={(e) => setAmount(e.target.value)} />
            <Form.Control type="text" placeholder="0x0" onChange={(e) => setReceiverAddress(e.target.value)} />
        </Container>
    )
}

export default FundsTransfer
