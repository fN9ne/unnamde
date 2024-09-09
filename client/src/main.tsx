import App from "./App.tsx";

import ReactDOM from "react-dom/client";
import ResetStyles from "./styles/Reset.tsx";

import { Provider } from "react-redux";
import { setupStore } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import FontStyles from "./styles/Fonts.tsx";
import GlobalStyles from "./styles/Global.tsx";

const store = setupStore();

ReactDOM.createRoot(document.querySelector(".wrapper")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<FontStyles />
			<ResetStyles />
			<GlobalStyles />
			<App />
		</BrowserRouter>
	</Provider>
);
