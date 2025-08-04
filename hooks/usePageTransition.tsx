"use client";
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "antd";
import Loader from "@/components/Loader";

interface PageTransitionContextType {
	navigateWithTransition: (path: string, blank?: boolean) => void;
	isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

interface PageTransitionProviderProps {
	children: ReactNode;
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [targetPath, setTargetPath] = useState("");
	const [showText, setShowText] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (isTransitioning) {
			const scrollY = window.scrollY;
			document.body.dataset.scrollY = scrollY.toString();
			document.documentElement.style.overflow = "hidden";
			document.documentElement.style.scrollbarGutter = "stable";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
		} else {
			const scrollY = document.body.dataset.scrollY;
			document.documentElement.style.overflow = "";
			document.documentElement.style.scrollbarGutter = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";

			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY, 10));
			}
			delete document.body.dataset.scrollY;
		}

		return () => {
			document.documentElement.style.overflow = "";
			document.documentElement.style.scrollbarGutter = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			delete document.body.dataset.scrollY;
		};
	}, [isTransitioning]);

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false);
			setIsTransitioning(false);
			setShowText(false); // ⬅️ reset state supaya tidak muncul langsung di transisi selanjutnya
		}
	}, [pathname]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const navigateWithTransition = (path: string, blank: boolean = false) => {
		if (isTransitioning) return;
		setShowText(false);
		setTargetPath(path);
		setIsTransitioning(true);
		setIsLoading(true);
		timeoutRef.current = setTimeout(() => {
			if (blank) {
				window.open(path, "_blank");
				setIsLoading(false);
				setIsTransitioning(false);
			} else {
				if (path === pathname) {
					setIsLoading(false);
					setIsTransitioning(false);
				} else {
					router.push(path);
				}
			}
		}, 1500);
	};

	const renderPathname = () => {
		if (targetPath === "/aboutme") return "about me";
		if (targetPath === "/contact") return "contact";
		return "welcome";
	};

	const renderSubtitle = () => {
		if (targetPath === "/aboutme") return "Frontend Developer";
		if (targetPath === "/contact") return "Get in touch";
		return "Wait a bit";
	};

	return (
		<PageTransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
			{children}
			<AnimatePresence mode="wait" onExitComplete={() => setShowText(false)}>
				{isTransitioning && (
					<motion.div
						key="overlay"
						initial={{ y: "100%" }}
						animate={{ y: "0%" }}
						exit={{ y: "-100%" }}
						onAnimationComplete={() => setShowText(true)}
						transition={{ duration: 0.5, ease: "easeInOut" }}
						style={{
							width: "100%",
							position: "fixed",
							height: "100dvh",
							left: 0,
							top: 0,
							backgroundImage: "url(/images/bg-2.jpg)",
							zIndex: 999,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "#0f141e",
								opacity: .95,
								zIndex: -1,
							}}
						/>
						<Loader />
					</motion.div>
				)}
				{isLoading && showText && (
					<motion.div
						key="transition-text"
						style={{
							color: "#fff",
							position: "fixed",
							bottom: 40,
							left: 40,
							display: "flex",
							flexDirection: "column",
							zIndex: 1000,
						}}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
					>
						<Typography.Text
							className="font-regular text-xs"
							style={{
								textTransform: "uppercase",
								letterSpacing: ".4em",
								color: "#e7e8e9",
							}}
						>
							{renderPathname()}
						</Typography.Text>
						<Typography.Text className="font-extrabold text-lg" style={{ color: "#e7e8e9" }}>
							{renderSubtitle()}
						</Typography.Text>
					</motion.div>
				)}
			</AnimatePresence>
		</PageTransitionContext.Provider>
	);
};

export const usePageTransition = () => {
	const context = useContext(PageTransitionContext);
	if (!context) {
		throw new Error("usePageTransition must be used within a PageTransitionProvider");
	}
	return context;
};
