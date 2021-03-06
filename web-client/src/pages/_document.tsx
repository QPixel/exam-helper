import { ColorModeScript } from '@chakra-ui/color-mode';
import createEmotionServer from '@emotion/server/create-instance';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import * as React from "react";
import customTheme from '../styles/theme';
import createEmotionCache from "../utils/emotionCache";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;
        const cache = createEmotionCache();

        const { extractCriticalToChunks } = createEmotionServer(cache);

        ctx.renderPage = () =>
            originalRenderPage({
                // eslint-disable-next-line react/display-name
                enhanceApp: (App: any) => (props) =>
                    <App emotionCache={cache} {...props} />,
            });

        const initialProps = await Document.getInitialProps(ctx);

        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(" ")}`}
                key={style.key}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ));

        return {
            ...initialProps,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                ...emotionStyleTags,
            ],
        };
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;