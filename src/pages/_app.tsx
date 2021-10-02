import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider, PortalManager } from "@chakra-ui/react";
import Head from "next/head";
import React from 'react';
import createEmotionCache from '../utils/emotionCache';
import customTheme from "../styles/theme";


const clientEmotionCache = createEmotionCache();
export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}


const MyApp: React.FC<MyAppProps> = ({ Component, pageProps, emotionCache = clientEmotionCache }) => {
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider theme={customTheme}>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
                <PortalManager>
                    <Component {...pageProps} />
                </PortalManager>

            </ChakraProvider>
        </CacheProvider>
    );
};

MyApp.defaultProps = {
    emotionCache: clientEmotionCache,
}

export default MyApp;
