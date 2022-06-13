import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import Explore from './routes/explore/Explore';
import Leaderboard from './routes/leaderboard/Leaderboard';
import { AuthProvider } from './contexts/AuthContext';
import ViewNFT from './routes/view-nft/ViewNFT';
import { UserProvider } from './contexts/UserContext';
import Profile from './routes/profile/Profile';
import FAQ from './routes/faq/FAQ';
import Feedback from './routes/feedback/Feedback';
import ConnectPromptModal from './components/ConnectPromptModal';
import { ModalProvider } from './contexts/ModalContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <ModalProvider>
          <ConnectPromptModal></ConnectPromptModal>
          <BrowserRouter>
            <ScrollToTop></ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/view/:slug" element={<ViewNFT />} />
              <Route path="/view" element={<ViewNFT />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:address" element={<Profile />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
