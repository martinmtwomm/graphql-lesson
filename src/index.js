import './index.css';

import { ApolloClient, gql } from 'apollo-boost';
import { persistor, store } from './redux/store';

import { ApolloProvider } from 'react-apollo';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const cache = new InMemoryCache();

const client = new ApolloClient({ link: httpLink, cache });

client
	.query({
		query: gql`
			{
				getCollectionsByTitle(title: "hats") {
					id
					title
					items {
						id
						name
						price
						imageUrl
					}
				}
			}
		`,
	})
	.then((res) => console.log(res));

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate persistor={persistor}>
					<App />
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
);
