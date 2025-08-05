"use client";
import { introduction, menuItems } from "@/data";
import { Flex, Grid, Typography } from "antd";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { usePageTransition } from "@/hooks/usePageTransition";

interface NavbarTitleProps {
	isActive: boolean;
}

interface MenuButtonProps {
	isActive: boolean;
	isAnimating: boolean;
	onClick: () => void;
}

interface MenuOverlayProps {
	isActive: boolean;
	onExitComplete: () => void;
}

interface MenuContentProps {
	isActive: boolean;
	loading: boolean;
	path: string;
	onAnimationStart: () => void;
	onAnimationComplete: () => void;
	onClick: (path: string, blank: boolean) => void;
}

interface AnimationVariants {
	menuContent: Variants;
	menuItem: Variants;
	menuLabel: Variants;
}

interface OverlayAnimation {
	initial: { y: string };
	animate: { y: string };
	exit: { y: string };
	transition: Transition;
}

interface StylesConfig {
	overlay: React.CSSProperties;
	menuContent: React.CSSProperties;
	menuLabel: React.CSSProperties;
	menuItem: React.CSSProperties;
	menuList: React.CSSProperties;
}

const ANIMATION_VARIANTS: AnimationVariants = {
	menuContent: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.05,
				delayChildren: 0.05,
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.2,
				ease: "easeIn",
				when: "afterChildren",
			},
		},
	},
	menuItem: {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
		exit: {
			opacity: 0,
			transition: {
				ease: "easeIn",
			},
		},
	},
	menuLabel: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.2, ease: "easeIn" },
		},
	},
};

const OVERLAY_ANIMATION: OverlayAnimation = {
	initial: { y: "100%" },
	animate: { y: "0%" },
	exit: { y: "-100%" },
	transition: {
		duration: 0.5,
		ease: "easeInOut",
	},
};

const STYLES: StylesConfig = {
	overlay: {
		width: "100%",
		position: "fixed" as const,
		height: "100vh",
		left: 0,
		top: 0,
		backgroundColor: "#0f141e",
		zIndex: 990,
	},
	menuContent: {
		width: "100%",
		height: "100%",
		position: "fixed" as const,
		top: 0,
		left: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 998,
	},
	menuLabel: {
		color: "#878a8f",
		marginBottom: "20px",
		letterSpacing: ".4em",
		fontSize: ".875rem",
	},
	menuItem: {
		cursor: "pointer",
		color: "#878a8f",
	},
	menuList: {
		listStyle: "none" as const,
		textAlign: "center" as const,
		paddingTop: "8px",
		paddingBottom: "2px",
		padding: 0,
		margin: 0,
	},
};

const useScrollLock = (isLocked: boolean): void => {
	useEffect(() => {
		if (isLocked) {
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
	}, [isLocked]);
};

const NavbarTitle: React.FC<{ isActive: boolean }> = ({ isActive }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { navigateWithTransition } = usePageTransition();
	const screens = Grid.useBreakpoint();

	const handleTitleClick = () => {
		if (!isActive) {
			navigateWithTransition("/");
		}
	};

	return (
		<Flex
			vertical
			style={{
				opacity: isHovered ? 0.7 : 1,
				cursor: isHovered ? "pointer" : "",
				transition: "opacity 0.3s ease",
				display: !screens.md ? "none" : "flex",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleTitleClick}
		>
			<Typography.Text
				className="font-extrabold nav-title"
				style={{
					color: isActive ? "#878a8f" : "",
					transition: "color 0.3s ease",
					transitionDelay: isActive ? "0.4s" : "0s",
				}}
			>
				{introduction.name}
			</Typography.Text>
			<Typography.Text
				className="font-medium nav-subtitle"
				style={{
					color: isActive ? "#878a8f" : "",
					transition: "color 0.3s ease",
					transitionDelay: isActive ? "0.4s" : "0s",
				}}
			>
				{introduction.role}
			</Typography.Text>
		</Flex>
	);
};

const MenuButton: React.FC<{ isActive: boolean; isAnimating: boolean; onClick: () => void }> = ({ isActive, isAnimating, onClick }) => {
	const screens = Grid.useBreakpoint();
	return (
		<Flex className="menu-wrap" onClick={isAnimating ? undefined : onClick}>
			<h1
				className="font-bold menu-text"
				style={{
					color: isActive ? "#878a8f" : "",
					transition: "color 0.3s ease",
					transitionDelay: isActive ? "0.4s" : "0s",
					display: !screens.md ? "none" : "block",
				}}
			>
				MENU
			</h1>
			<div className={`hamburger hamburger--collapse ${isActive ? "is-active" : ""}`}>
				<div className="hamburger-box">
					<div className={`hamburger-inner ${isActive ? "active" : ""}`}></div>
				</div>
			</div>
		</Flex>
	);
};

const MenuOverlay: React.FC<{ isActive: boolean; onExitComplete: () => void }> = ({ isActive, onExitComplete }) => (
	<AnimatePresence mode="wait" onExitComplete={onExitComplete}>
		{isActive && (
			<motion.div
				key="menu-overlay"
				initial={OVERLAY_ANIMATION.initial}
				animate={OVERLAY_ANIMATION.animate}
				exit={OVERLAY_ANIMATION.exit}
				transition={OVERLAY_ANIMATION.transition}
				style={STYLES.overlay}
			/>
		)}
	</AnimatePresence>
);

const MenuContent: React.FC<{
	isActive: boolean;
	onAnimationStart: () => void;
	onAnimationComplete: () => void;
	onClick: (path: string, blank: boolean) => void;
}> = ({ isActive, onAnimationStart, onAnimationComplete, onClick }) => {
	const pathname = usePathname();
	const screens = Grid.useBreakpoint();

	return (
		<AnimatePresence
			mode="wait"
			onExitComplete={() => {
				if (!isActive) {
					onAnimationComplete();
				}
			}}
		>
			{isActive && (
				<motion.div
					key="menu-content"
					variants={ANIMATION_VARIANTS.menuContent}
					initial="hidden"
					animate="visible"
					exit="exit"
					onAnimationStart={() => {
						if (isActive) onAnimationStart();
					}}
					onAnimationComplete={(definition) => {
						if (definition === "visible") {
							onAnimationComplete();
						}
					}}
					style={STYLES.menuContent}
				>
					<motion.div key="menu" initial={{ y: 0, opacity: 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
						<Flex justify="center" vertical align="center" style={{ height: "100%" }}>
							<motion.p className="font-regular" style={STYLES.menuLabel} variants={ANIMATION_VARIANTS.menuLabel}>
								MENU
							</motion.p>
							{menuItems.map((item, index) => (
								<motion.ul key={index} style={STYLES.menuList}>
									<motion.li
										className="font-extrabold"
										variants={ANIMATION_VARIANTS.menuItem}
										whileHover={{
											color: "#fff",
											transition: { duration: 0.1 },
										}}
										style={{
											...STYLES.menuItem,
											fontSize: screens.md ? "3.25rem" : "2.125rem",
											color: pathname === item.path ? "#fff" : STYLES.menuItem.color,
										}}
										onClick={() => onClick(item.path, item.blank)}
									>
										{item.name}
									</motion.li>
								</motion.ul>
							))}
						</Flex>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Navbar: React.FC = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const { navigateWithTransition, isTransitioning } = usePageTransition();
	const screens = Grid.useBreakpoint();

	useScrollLock(isActive);

	const handleMenu = useCallback(() => {
		if (isAnimating || isTransitioning) return;
		setIsAnimating(true);
		setIsActive((prev) => !prev);
	}, [isAnimating, isTransitioning]);

	const handleOverlayExitComplete = useCallback(() => {
		setIsAnimating(false);
	}, []);

	const handleAnimationStart = useCallback(() => {
		setIsAnimating(true);
	}, []);

	const handleAnimationComplete = useCallback(() => {
		setIsAnimating(false);
	}, []);

	const handleRedirect = useCallback(
		(path: string, blank: boolean) => {
			setIsActive(false);
			navigateWithTransition(path, blank);
		},
		[navigateWithTransition]
	);

	return (
		<>
			<Flex justify={!screens.md ? "flex-end" : "space-between"} className="navbar-section">
				<NavbarTitle isActive={isActive} />
				<MenuButton isActive={isActive} isAnimating={isAnimating} onClick={handleMenu} />
			</Flex>
			<MenuOverlay isActive={isActive} onExitComplete={handleOverlayExitComplete} />
			<MenuContent isActive={isActive} onAnimationStart={handleAnimationStart} onAnimationComplete={handleAnimationComplete} onClick={handleRedirect} />
		</>
	);
};

export default Navbar;
