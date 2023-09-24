import { Container } from 'react-bootstrap'
import './walletInfo.scss'
import { useSelector } from 'react-redux'
import { selectAddress } from '../../redux/appSlice'
import { useState, useEffect } from 'react'

const ERC20ABI = require('../../abi.json')
const UNI_TOKEN_ADDRESS = '0xb33EaAd8d922B1083446DC23f610c2567fB5180f'

const WalletInfo = () => {
    const address = useSelector(selectAddress)
    const [ether, setEther] = useState(0)
    const [uni, setUni] = useState(0)
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

            let uni
            try {
                const uniTokenContract = await new ethers.Contract(UNI_TOKEN_ADDRESS, ERC20ABI, provider)
                uni = await uniTokenContract.balanceOf(walletAddress)
                uni = ethers.utils.formatEther(uni, 18)
                setUni(uni)
            } catch (error) {
                console.error('Error fetching UNI balance:', error)
            }
        }
        onLoad()
    }, [])

    return (
        <Container className="center-container">
            <p>Address: {address}</p>
            <p>Ether balance: {ether}</p>
            <p>UNI balance: {uni}</p>
        </Container>
    )
}

export default WalletInfo
