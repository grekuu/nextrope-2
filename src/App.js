import './index.scss'
import ConnectWallet from './components/ConnectWallet/ConnectWallet'
import FundsTransfer from './components/FundsTransfer/FundsTransfer'
import WalletInfo from './components/WalletInfo/WalletInfo'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ConnectWallet />} />
                    <Route path="/funds-transfer" element={<FundsTransfer />}></Route>
                    <Route path="/wallet-info" element={<WalletInfo />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
