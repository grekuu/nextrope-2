import { Button, Container, Dropdown, DropdownButton } from 'react-bootstrap'
import './connectWallet.scss'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { passAddress, passNetworkName } from '../../redux/appSlice'

//chainlist
const networks = {
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: [
            'https://bsc-dataseed1.binance.org',
            'https://bsc-dataseed2.binance.org',
            'https://bsc-dataseed3.binance.org',
            'https://bsc-dataseed4.binance.org',
            'https://bsc-dataseed1.defibit.io',
            'https://bsc-dataseed2.defibit.io',
            'https://bsc-dataseed3.defibit.io',
            'https://bsc-dataseed4.defibit.io',
            'https://bsc-dataseed1.ninicoin.io',
            'https://bsc-dataseed2.ninicoin.io',
            'https://bsc-dataseed3.ninicoin.io',
            'https://bsc-dataseed4.ninicoin.io',
            'wss://bsc-ws-node.nariox.org',
        ],
        blockExplorerUrls: ['https://bscscan.com'],
    },
}

const ConnectWallet = () => {
    const [error, setError] = useState()
    const [walletDetected, setWalletDetected] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        requestAccount()
    }, [])

    async function requestAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })
                console.log(accounts)
                dispatch(passAddress(accounts[0]))
            } catch (error) {
                console.log('Connecting error')
            }
        } else {
            setWalletDetected('Wallet not detected')
        }
    }

    const changeNetwork = async ({ network, setError }) => {
        try {
            if (!window.ethereum) throw new Error('No crypto wallet found')
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        ...networks[network],
                    },
                ],
            })
        } catch (err) {
            setError(err.message)
        }
    }

    async function switchNetwork(network) {
        await changeNetwork({ network, setError })
        dispatch(passNetworkName(network))
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
        }
    }

    return (
        <Container className="center-container">
            <Button variant="primary" onClick={connectWallet}>
                Connect Wallet
            </Button>
            <span>{walletDetected}</span>
            <DropdownButton id="dropdown-basic-button" title="Change network">
                <Dropdown.Item onClick={() => switchNetwork('polygon')}>Polygon</Dropdown.Item>
                <Dropdown.Item onClick={() => switchNetwork('bsc')}>Bsc</Dropdown.Item>
            </DropdownButton>
        </Container>
    )
}

export default ConnectWallet
