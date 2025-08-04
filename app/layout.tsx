import type { Metadata } from "next";
import "@/styles/globals.scss";
import "hamburgers/dist/hamburgers.css";
import "aos/dist/aos.css";

import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import { PageTransitionProvider } from "@/hooks/usePageTransition";

const HELVETICA_THIN = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Thin.ttf",
	variable: "--font-helvetica-thin",
});

const HELVETICA_LIGHT = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Light.ttf",
	variable: "--font-helvetica-light",
});

const HELVETICA_REGULAR = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Regular.ttf",
	variable: "--font-helvetica-regular",
});
const HELVETICA_MEDIUM = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Medium.ttf",
	variable: "--font-helvetica-medium",
});
const HELVETICA_BOLD = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Bold.ttf",
	variable: "--font-helvetica-bold",
});
const HELVETICA_EXTRA_BOLD = localFont({
	src: "../public/fonts/HelveticaNowDisplay-ExtraBold.ttf",
	variable: "--font-helvetica-extra-bold",
});
const HELVETICA_BLACK = localFont({
	src: "../public/fonts/HelveticaNowDisplay-Black.ttf",
	variable: "--font-helvetica-black",
});
const HELVETICA_EXTRA_BLACK = localFont({
	src: "../public/fonts/HelveticaNowDisplay-ExtBlk.ttf",
	variable: "--font-helvetica-extra-black",
});

export const metadata: Metadata = {
	title: "Portfolio | Sangkan Faiq Akhsan Musafa",
	description:
		"Explore the professional portfolio of Sangkan Faiq Akhsan Musafa — a Frontend Developer specializing in Next.js, React.js, and modern web development. View projects, skills, and experience.",
	keywords: ["Frontend Developer", "Sangkan Faiq", "Next.js Developer", "React.js Developer", "Web Developer Portfolio", "JavaScript", "TypeScript", "UI Developer", "Modern Web Development"],
	authors: [{ name: "Sangkan Faiq Akhsan Musafa" }],
	creator: "Sangkan Faiq Akhsan Musafa",
	robots: "index, follow",
	openGraph: {
		title: "Frontend Developer Portfolio | Sangkan Faiq Akhsan Musafa",
		description: "Professional portfolio showcasing projects and experience of Sangkan Faiq — expert in Next.js and React.js development.",
		siteName: "Sangkan Faiq Portfolio",
		type: "website",
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${HELVETICA_THIN.variable} ${HELVETICA_LIGHT.variable} ${HELVETICA_REGULAR.variable} ${HELVETICA_MEDIUM.variable} ${HELVETICA_BOLD.variable} ${HELVETICA_EXTRA_BOLD.variable} ${HELVETICA_BLACK.variable} ${HELVETICA_EXTRA_BLACK.variable}`}
		>
			<body>
				<PageTransitionProvider>
					<Navbar />
					{children}
				</PageTransitionProvider>
			</body>
		</html>
	);
}
