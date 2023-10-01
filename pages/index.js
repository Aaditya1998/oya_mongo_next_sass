import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
