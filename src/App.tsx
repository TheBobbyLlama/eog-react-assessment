import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MetricMonitor from './components/MetricMonitor';
import Dashboard from './components/Dashboard';

const client = new ApolloClient({
  uri: 'https://react-assessment.herokuapp.com/graphql',
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
