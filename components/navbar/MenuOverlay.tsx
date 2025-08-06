import { AnimatePresence, motion, Transition } from "framer-motion";

export interface OverlayAnimation {
	initial: { y: string };
	animate: { y: string };
	exit: { y: string };
	transition: Transition;
}

export interface StylesConfig {
	overlay: React.CSSProperties;
	menuContent: React.CSSProperties;
	menuLabel: React.CSSProperties;
	menuItem: React.CSSProperties;
	menuList: React.CSSProperties;
}

export const OVERLAY_ANIMATION: OverlayAnimation = {
	initial: { y: "100%" },
	animate: { y: "0%" },
	exit: { y: "-100%" },
	transition: {
		duration: 0.5,
		ease: "easeInOut",
	},
};

export const STYLES: StylesConfig = {
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

export const MenuOverlay: React.FC<{ isActive: boolean; onExitComplete: () => void }> = ({ isActive, onExitComplete }) => (
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
