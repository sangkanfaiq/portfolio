import { Flex, Grid } from "antd";

export const MenuButton: React.FC<{ isActive: boolean; isAnimating: boolean; onClick: () => void; isLoadingTextVisible: boolean }> = ({ isActive, isAnimating, onClick, isLoadingTextVisible }) => {
	const screens = Grid.useBreakpoint();
	return (
		<Flex
			gap="small"
			className="menu-wrap"
			onClick={isAnimating || isLoadingTextVisible ? undefined : onClick}
			style={{
				opacity: isLoadingTextVisible ? 0 : 1,
				pointerEvents: isLoadingTextVisible ? "none" : "auto",
				transition: "opacity 0.4s ease",
			}}
		>
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
