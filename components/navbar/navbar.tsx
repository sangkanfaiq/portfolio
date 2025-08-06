"use client";
import { introduction } from "@/data";
import { Flex, Grid } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { usePageTransition } from "@/hooks/usePageTransition";
import { NavbarTitle } from "./NavbarTitle";
import { MenuButton } from "./NavbarButton";
import { MenuOverlay } from "./MenuOverlay";
import { MenuContent } from "./MenuContent";
import OverlayLoading from "./OverlayLoading";

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

const Navbar: React.FC = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [isLoadingTextVisible, setIsLoadingTextVisible] = useState(false);
	const { navigateWithTransition, isTransitioning } = usePageTransition();
	const [pendingNavigation, setPendingNavigation] = useState<{ path: string; blank: boolean } | null>(null);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [targetPath, setTargetPath] = useState("");
	const screens = Grid.useBreakpoint();
	useScrollLock(isActive);

	const handleMenu = useCallback(() => {
		if (isAnimating || isTransitioning) return;
		setIsAnimating(true);
		setIsActive((prev) => !prev);
	}, [isAnimating, isTransitioning]);

	const handleOverlayExitComplete = useCallback(() => {
		setIsAnimating(false);
		if (pendingNavigation) {
			navigateWithTransition(pendingNavigation.path, pendingNavigation.blank, true);
			setPendingNavigation(null);
		}
		setIsLoadingTextVisible(false);
	}, [navigateWithTransition, pendingNavigation]);

	const handleAnimationStart = useCallback(() => {
		setIsAnimating(true);
	}, []);

	const handleAnimationComplete = useCallback(() => {
		setIsAnimating(false);
	}, []);

	const handleRedirect = useCallback(
		(path: string, blank: boolean) => {
			if (isAnimating || isTransitioning) return;
			setTargetPath(path);
			setIsLoadingTextVisible(true);
			setIsFadingOut(false);
			const minimumLoading = new Promise<void>((resolve) => setTimeout(resolve, 2000));
			const navigationTrigger = new Promise<void>((resolve) => {
				setTimeout(() => {
					setIsFadingOut(true);
					setTimeout(() => {
						setIsActive(false);
						setPendingNavigation({ path, blank });
						resolve();
					}, 400);
				}, 2000);
			});

			Promise.all([minimumLoading, navigationTrigger]).then(() => {
				navigateWithTransition(path, blank, true);
				setPendingNavigation(null);
				setIsLoadingTextVisible(false);
			});
		},
		[isAnimating, isTransitioning, navigateWithTransition]
	);

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
		<>
			<Flex justify={"space-between"} className={`navbar-section ${isActive || isTransitioning || isAnimating ? "transparent" : ""}`}>
				<NavbarTitle data={introduction} isActive={isActive} />
				<MenuButton isActive={isActive} isAnimating={isAnimating} isLoadingTextVisible={isLoadingTextVisible} onClick={handleMenu} />
			</Flex>
			<MenuOverlay isActive={isActive} onExitComplete={handleOverlayExitComplete} />
			<OverlayLoading isFadingOut={isFadingOut} isLoadingTextVisible={isLoadingTextVisible} renderPathname={renderPathname} renderSubtitle={renderSubtitle} />
			<MenuContent
				isActive={isActive}
				isLoadingTextVisible={isLoadingTextVisible}
				onAnimationStart={handleAnimationStart}
				onAnimationComplete={handleAnimationComplete}
				onClick={handleRedirect}
			/>
		</>
	);
};

export default Navbar;
