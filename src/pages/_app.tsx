import { UserContextProvider } from '../Contexts/UserContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  )
}

export default MyApp
