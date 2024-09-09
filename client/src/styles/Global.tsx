import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	:root {
		/* neutrals */
		--0: #f0f0f0;
		--100: #e6e7f0;
		--200: #d5d7e3;
		--300: #bfc2d6;
		--400: #a9acc3;
		--500: #868795;
		--600: #5a5b69;
		--700: #484855;
		--800: #31313d;
		--900: #0b0b0e;
		/* primary */
		--primary-lighter: #89ccf6;
		--primary-light: #55beff;
		--primary: #2cacfc;
		--primary-dark: #1e90d7;
		--primary-darker: #157ab9;
		/* correct */
		--correct-lighter: #8ae99b;
		--correct-light: #51e16b;
		--correct: #1dde40;
		--correct-dark: #16c836;
		--correct-darker: #0ba627;
		/* error */
		--error-lighter: #ee9696;
		--error-light: #eb6666;
		--error: #e23737;
		--error-dark: #c42626;
		--error-darker: #a92121;
	}

	.wrapper {
		min-height: 100%;
		overflow: auto;
	}
`;

export default GlobalStyles;
