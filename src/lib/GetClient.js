import { customNetworkInterface } from 'src/lib/CustomNetworkInterface';

const URI = 'your URI';

const networkInterface = customNetworkInterface({
  uri: URI,
  opts: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export default networkInterface;
