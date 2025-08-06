import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Loader from "../Loader";
import { Grid, Typography } from "antd";

interface OverlayLoadingInterface {
    isLoadingTextVisible: boolean,
    isFadingOut: boolean,
    renderPathname: () => string;
	renderSubtitle: () => string;

}

const OverlayLoading = ({isLoadingTextVisible, isFadingOut, renderPathname, renderSubtitle}: OverlayLoadingInterface) => {
    const screens = Grid.useBreakpoint()
	return (
		<AnimatePresence>
			{isLoadingTextVisible && (
				<motion.div
					key="loading-text"
					initial={{ opacity: 0 }}
					animate={{ opacity: isFadingOut ? 0 : 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 9999,
						pointerEvents: "none",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<Loader />
					</div>
					<AnimatePresence mode="wait">
						{!isFadingOut && (
							<motion.div
								key="transition-text"
								style={{
									color: "#fff",
									position: "absolute",
									bottom: screens.md ? 40 : 20,
									left: screens.md ? 40 : 20,
									display: "flex",
									flexDirection: "column",
									zIndex: 1000,
								}}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -40, opacity: 0 }}
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
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default OverlayLoading;
