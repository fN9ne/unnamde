import { createGlobalStyle } from "styled-components";

const FontStyles = createGlobalStyle`
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Normal'), local('ggsans-Normal'),
			url('/src/assets/fonts/ggsans-Normal.eot?#iefix') format('embedded-opentype'),
			url('/src/assets/fonts/ggsans-Normal.woff2') format('woff2'),
			url('/src/assets/fonts/ggsans-Normal.woff') format('woff'),
			url('/src/assets/fonts/ggsans-Normal.ttf') format('truetype');
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Normal Italic'), local('ggsans-NormalItalic'),
			url('/src/assets/fonts/ggsans-NormalItalic.eot?#iefix') format('embedded-opentype'),
			url('/src/assets/fonts/ggsans-NormalItalic.woff2') format('woff2'),
			url('/src/assets/fonts/ggsans-NormalItalic.woff') format('woff'),
			url('/src/assets/fonts/ggsans-NormalItalic.ttf') format('truetype');
		font-weight: 400;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Medium'), local('ggsans-Medium'),
			url('src/assets/fonts/ggsans-Medium.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-Medium.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-Medium.woff') format('woff'),
			url('src/assets/fonts/ggsans-Medium.ttf') format('truetype');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Medium Italic'), local('ggsans-MediumItalic'),
			url('src/assets/fonts/ggsans-MediumItalic.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-MediumItalic.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-MediumItalic.woff') format('woff'),
			url('src/assets/fonts/ggsans-MediumItalic.ttf') format('truetype');
		font-weight: 500;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans SemiBold'), local('ggsans-Semibold'),
			url('src/assets/fonts/ggsans-Semibold.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-Semibold.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-Semibold.woff') format('woff'),
			url('src/assets/fonts/ggsans-Semibold.ttf') format('truetype');
		font-weight: 600;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans SemiBold Italic'), local('ggsans-SemiboldItalic'),
			url('src/assets/fonts/ggsans-SemiboldItalic.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-SemiboldItalic.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-SemiboldItalic.woff') format('woff'),
			url('src/assets/fonts/ggsans-SemiboldItalic.ttf') format('truetype');
		font-weight: 600;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Bold'), local('ggsans-Bold'),
			url('src/assets/fonts/ggsans-Bold.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-Bold.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-Bold.woff') format('woff'),
			url('src/assets/fonts/ggsans-Bold.ttf') format('truetype');
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans Bold Italic'), local('ggsans-BoldItalic'),
			url('src/assets/fonts/ggsans-BoldItalic.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-BoldItalic.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-BoldItalic.woff') format('woff'),
			url('src/assets/fonts/ggsans-BoldItalic.ttf') format('truetype');
		font-weight: 700;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans ExtraBold'), local('ggsans-ExtraBold'),
			url('src/assets/fonts/ggsans-ExtraBold.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-ExtraBold.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-ExtraBold.woff') format('woff'),
			url('src/assets/fonts/ggsans-ExtraBold.ttf') format('truetype');
		font-weight: 800;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'gg sans';
		src: local('gg sans ExtraBold Italic'), local('ggsans-ExtraBoldItalic'),
			url('src/assets/fonts/ggsans-ExtraBoldItalic.eot?#iefix') format('embedded-opentype'),
			url('src/assets/fonts/ggsans-ExtraBoldItalic.woff2') format('woff2'),
			url('src/assets/fonts/ggsans-ExtraBoldItalic.woff') format('woff'),
			url('src/assets/fonts/ggsans-ExtraBoldItalic.ttf') format('truetype');
		font-weight: 800;
		font-style: italic;
		font-display: swap;
	}
`;

export default FontStyles;
