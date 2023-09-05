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

const themeOptions = {
  colors: {
    primary: "#4A246B",
    secondary: "#CFC6EC",
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
  return (
    <ThemeProvider themeOptions={themeOptions}>
      <CssBaseline />
      {/* <TopBar /> */}
      <Sticky innerZ={1}>
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
      store.dispatch(setLoadingStatus(LoadingStatus.LOADING));
      try {
        const data = await Api(ctx).user.getMe();
        store.dispatch(setUserData(data));
        store.dispatch(setLoadingStatus(LoadingStatus.LOADED));
      } catch (error) {
        store.dispatch(setLoadingStatus(LoadingStatus.ERROR));
        if (ctx.asPath === "/write") {
          ctx.res.writeHead(302, {
            Location: "/403",
          });
          ctx.res.end();
        }
      }
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
