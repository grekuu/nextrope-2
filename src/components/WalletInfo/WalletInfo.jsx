import { Container } from 'react-bootstrap'
import './walletInfo.scss'
import { useSelector } from 'react-redux'
import { selectAddress } from '../../redux/appSlice'
import { useState, useEffect } from 'react'

const ERC20ABI = require('../../abi.json')
const TOKEN_ADDRESS = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'

const WalletInfo = () => {
    const address = useSelector(selectAddress)
    const [ether, setEther] = useState(0)
    const [token, setToken] = useState(0)
    const [walletAddress, setWalletAddress] = useState(0)
    const ethers = require('ethers')

    useEffect(() => {
        const onLoad = async () => {
            const provider = await new ethers.providers.Web3Provider(window.ethereum)
            provider.send('eth_requestAccounts', [])
            const signer = provider.getSigner()

            let ether
            ether = await signer.getBalance()
            ether = ethers.utils.formatEther(ether, 18)
            setEther(ether)

            const walletAddress = await signer.getAddress()
            setWalletAddress(walletAddress)

            let token
            try {
                const tokenTokenContract = await new ethers.Contract(TOKEN_ADDRESS, ERC20ABI, provider)
                token = await tokenTokenContract.balanceOf(walletAddress)
                token = ethers.utils.formatEther(token, 18)
                setToken(token)
            } catch (error) {
                console.error('Error fetching TOKEN balance:', error)
            }
        }
        onLoad()
    }, [])

    return (
        <Container className="center-container">
            <p>Address: {address}</p>
            <p>Ether balance: {ether}</p>
            <p>TOKEN balance: {token}</p>
        </Container>
    )
}

export default WalletInfo
