import { CookiesProvider } from 'next-client-cookies/server';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/header';

export const metadata = {
	metadataBase: new URL('https://postgres-starter.vercel.app'),
	title: 'Vercel Postgres Demo',
	description: 'A simple Next.js app with Vercel Postgres as the database'
};

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap'
});

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<CookiesProvider>
				<body suppressHydrationWarning={true} className={inter.variable}>
					<Header />
					<main>{children}</main>
				</body>
			</CookiesProvider>
		</html>
	);
}
