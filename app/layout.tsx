import Main from "./components/ui/main/Main";
import Navbar from "./components/ui/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import SettingModal from "./components/ui/modal/SettingModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeuralClocks",
  description: "Pomodoro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Modals */}
        <SettingModal />
        {/* Navbar */}
        <nav>
          <Navbar />
        </nav>
        {/* Main */}
        <Main>{children}</Main>
      </body>
    </html>
  );
}
