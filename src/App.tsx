import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MetricMonitor from './components/MetricMonitor';
import Dashboard from './components/Dashboard';

const httpLink = new HttpLink({
  uri: 'https://react-assessment.herokuapp.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://react-assessment.herokuapp.com/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && // eslint-disable-line operator-linebreak
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <MetricMonitor />
      <CssBaseline />
      <Wrapper>
        <Header />
        <Dashboard />
        <ToastContainer />
      </Wrapper>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
