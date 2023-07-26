import Layout from "@/components/Layout/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useThemeStore } from "@/lib/zustand.store";
import { Suspense } from "react";
import PageLoader from "@/components/Loader/PageLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protected from "@/utils/Protected";
import SocketProvider from "@/utils/SocketProvider";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApp({ Component, pageProps }: AppProps) {
	const { theme } = useThemeStore((state) => ({
		theme: state.theme,
	}));
	const queryClient = new QueryClient();

	return (
		<>
			<Head>
				<title>Univboard</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="A universal note app with first class clipboard support."
				/>
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:title" content="Univboard" />
				<meta
					property="og:description"
					content="A universal note app with first class clipboard support."
				/>
				<meta property="og:type" content="website" />
				{/* <meta property="og:image" content="https://univboard.com/og-image.png" /> */}
			</Head>
			<Suspense fallback={<PageLoader />}>
				<MantineProvider
					theme={{
						fontFamily: "Poppins, sans-serif",
						colorScheme: theme,
					}}
					withGlobalStyles
				>
					<QueryClientProvider client={queryClient}>
						<Protected>
							<SocketProvider>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</SocketProvider>
							<Notifications />
						</Protected>
					</QueryClientProvider>
				</MantineProvider>
			</Suspense>
		</>
	);
}
