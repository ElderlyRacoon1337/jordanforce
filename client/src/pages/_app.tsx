import { Subheader } from "@/components/Subheader";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "cutie-ui";
import type { AppProps } from "next/app";
import Sticky from "react-stickynode";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";

const themeOptions = {
  colors: {
    primary: "#4A246B",
    secondary: "#CFC6EC",
    // background: "#f2f2f2",
    bgTransparent: "rgba(255, 255, 255, 0.9)",
  },
  darkMode: {
    // background: "#0f0f0f",
    primary: "#b661ff",
    bgTransparent: "rgba(0, 0, 0, 0.9)",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider themeOptions={themeOptions}>
      <CssBaseline />
      <TopBar />
      <Sticky innerZ={1}>
        <Header />
      </Sticky>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
