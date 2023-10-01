import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "cutie-ui";
import type { AppProps } from "next/app";
import Sticky from "react-stickynode";
import { Footer } from "@/components/Footer";
import { Api } from "@/utils/api";
import { wrapper } from "@/redux/store";
import {
  LoadingStatus,
  setLoadingStatus,
  setUserData,
} from "@/redux/slices/userSlice";
import { TopBar } from "@/components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setItems } from "@/redux/slices/cartSlice";

const themeOptions = {
  colors: {
    primary: "#9b8dcc",
    // secondary: "#CFC6EC",
    secondary: "#9b8dcc",

    bgTransparent: "rgba(255, 255, 255, 0.9)",
    submitButton: "#000",
  },
  darkMode: {
    // primary: "#b661ff",
    // primary: "#d3a1ff",
    // primary: "#376CA4",
    primary: "#E9C6EC",
    bgTransparent: "rgba(0, 0, 0, 0.9)",
    submitButton: "#252525",
    success: "#7DD48E",
  },
};

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      dispatch(setItems(cartItems));
    }

    dispatch(setLoadingStatus(LoadingStatus.LOADING));
    (async function anonym() {
      try {
        const data = await Api().user.getMe();
        dispatch(setUserData(data));
        dispatch(setLoadingStatus(LoadingStatus.LOADED));
      } catch (error) {
        dispatch(setLoadingStatus(LoadingStatus.ERROR));
      }
    })();
  }, []);
  return (
    <ThemeProvider themeOptions={themeOptions}>
      <CssBaseline />
      <TopBar />
      <Sticky innerZ={10}>
        <Header />
      </Sticky>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store): any =>
    async ({ ctx, Component }: any) => {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
