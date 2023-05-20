import Main from './components/ui/main/Main';
import Navbar from './components/ui/navbar/Navbar';
import { Inter } from 'next/font/google';
import Providers from './providers/Providers';

import './globals.css';
import SettingModal from './components/modals/SettingModal';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ConfirmationModal from './components/modals/ConfirmationModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NeuralClocks',
  description: 'Pomodoro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {/* Modals */}
          <SettingModal />
          <RegisterModal />
          <LoginModal />
          <ConfirmationModal />
          {/* Navbar */}
          <nav>
            <Navbar />
          </nav>
          {/* Main */}
          <Main>{children}</Main>
        </Providers>
      </body>
    </html>
  );
}
