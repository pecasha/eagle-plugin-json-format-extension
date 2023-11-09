import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { MantineProvider } from "@mantine/core";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "src/constants/globalStyle";
import {
    darkTheme,
    lightTheme
} from "src/constants/theme";
import { ModalController } from "src/layout/ModalController";
import useStored from "src/store/useStored";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});

function JsonCrack({Component, pageProps}: AppProps) {
    const [isReady, setReady] = React.useState(false);
    const lightmode = useStored(state => state.lightmode);

    React.useEffect(() => {
        setReady(true);
    }, []);

    if (isReady) {
        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={lightmode ? lightTheme : darkTheme}>
                    <GlobalStyle/>
                    {}
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        withCSSVariables
                        theme={{
                            colorScheme: lightmode ? "light" : "dark",
                            components: {
                                Divider: {
                                    styles: () => ({
                                        root: {
                                            borderTopColor: "#4D4D4D !important"
                                        }
                                    })
                                },
                                Modal: {
                                    styles: theme => ({
                                        title: {
                                            fontWeight: 700
                                        },
                                        header: {
                                            backgroundColor: theme.colorScheme === "dark" ? "#36393e" : "#fff"
                                        },
                                        body: {
                                            backgroundColor: theme.colorScheme === "dark" ? "#36393e" : "#fff"
                                        }
                                    })
                                },
                                Button: {
                                    styles: theme => ({
                                        inner: {
                                            fontWeight: 700
                                        }
                                    })
                                }
                            }
                        }}
                    >
                        <Component {...pageProps} />
                        <ModalController/>
                        <Toaster
                            position="top-right"
                            containerStyle={{
                                top: 40,
                                right: 6,
                                fontSize: 14
                            }}
                            toastOptions={{
                                style: {
                                    background: "#4d4d4d",
                                    color: "#b9bbbe"
                                }
                            }}
                        />
                    </MantineProvider>
                </ThemeProvider>
            </QueryClientProvider>
        );
    }
}

export default JsonCrack;
