import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from 'react';
import createEmotionCache from '../utils/emotionCache';


const clientEmotionCache = createEmotionCache();
export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = ({Component, pageProps, emotionCache = clientEmotionCache}) => {
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
				<Component {...pageProps} />
            </ChakraProvider>
        </CacheProvider>
    );
};

MyApp.defaultProps = {
	emotionCache: clientEmotionCache,
}

export default MyApp;
