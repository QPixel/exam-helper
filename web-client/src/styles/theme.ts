import { extendTheme, ThemeConfig, Theme } from "@chakra-ui/react";


interface customTheme extends Theme {

}
const theme = {
	styles: {
		global: {
			"html, body": {
				"overflow": "hidden"
			}
		}
	}
}
const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
} as ThemeConfig

const customTheme = extendTheme({
	theme,
	config
});

export default customTheme as Theme;