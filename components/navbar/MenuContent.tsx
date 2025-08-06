import { Flex, Grid } from "antd";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { STYLES } from "./MenuOverlay";
import { menuItems } from "@/data";

interface AnimationVariants {
	menuContent: Variants;
	menuItem: Variants;
	menuLabel: Variants;
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

export const MenuContent: React.FC<{
	isActive: boolean;
	isLoadingTextVisible: boolean;
	onAnimationStart: () => void;
	onAnimationComplete: () => void;
	onClick: (path: string, blank: boolean) => void;
}> = ({ isActive, onAnimationStart, onAnimationComplete, onClick, isLoadingTextVisible }) => {
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
					initial={isLoadingTextVisible ? { opacity: 1 } : "hidden"}
					animate={isLoadingTextVisible ? { opacity: 0 } : "visible"}
					exit="exit"
					variants={!isLoadingTextVisible ? ANIMATION_VARIANTS.menuContent : undefined}
					transition={isLoadingTextVisible ? { duration: 0.4, ease: "easeOut" } : undefined}
					onAnimationStart={() => {
						if (isActive) onAnimationStart();
					}}
					onAnimationComplete={(definition) => {
						if (definition === "visible") {
							onAnimationComplete();
						}
					}}
					style={{
						...STYLES.menuContent,
						willChange: "opacity",
						pointerEvents: isLoadingTextVisible ? "none" : "auto",
					}}
				>
					<motion.div key="menu" initial={{ y: 0, opacity: 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
						<Flex justify="center" vertical align="center" style={{ height: "100%" }}>
							{!isLoadingTextVisible && (
								<>
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
								</>
							)}
						</Flex>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
