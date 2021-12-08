import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';
import Auth from '../components/Auth';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  )
}

export default MyApp
