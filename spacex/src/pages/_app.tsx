import "../../styles/globals.css";
import "react-bulma-components/dist/react-bulma-components.min.css";

import { ApolloProvider } from "@apollo/client";
import client from '../graphql/apolloClient'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
