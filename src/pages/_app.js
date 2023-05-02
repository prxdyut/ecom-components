import "@/styles/globals.css";
import "@/styles/muiTheme.css";
import Auth from "../wrappers/auth-session";
import Account from "../wrappers/account-fetch";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Auth session={session}>
      <Account>
        <Component {...pageProps} />
      </Account>
    </Auth>
  );
}
