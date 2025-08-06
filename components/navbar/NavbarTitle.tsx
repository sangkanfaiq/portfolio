import { usePageTransition } from "@/hooks/usePageTransition";
import { Flex, Grid, Typography } from "antd";
import React, { useState } from "react";

export const NavbarTitle: React.FC<{ isActive: boolean; data: { fullname: string; nickname: string; role: string; shortrole: string } }> = ({ isActive, data }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { navigateWithTransition } = usePageTransition();
	const screens = Grid.useBreakpoint();

	const handleTitleClick = () => {
		if (!isActive) {
			navigateWithTransition("/", false, false);
		}
	};

	return (
		<Flex
			style={{
				opacity: isHovered ? 0.7 : 1,
				cursor: isHovered ? "pointer" : "",
				transition: "opacity 0.3s ease",
			}}
			gap={12}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleTitleClick}
		>
			<Flex justify="center" align="center">
				<Flex
					justify="center"
					align="center"
					style={{
						width: "2.5rem",
						height: "2.5rem",
						borderRadius: "50%",
						border: `3px solid ${isActive ? "#878a8f" : "#000"}`,
						color: isActive ? "#878a8f" : "",
						transition: "color 0.3s ease, border 0.3 ease",
						transitionDelay: isActive ? "0.4s" : "0s",
					}}
				>
					<h1 className="font-bold text-reg">S</h1>
				</Flex>
			</Flex>
			<Flex justify="center" vertical>
				<Typography.Text
					className="font-extrabold nav-title"
					style={{
						color: isActive ? "#878a8f" : "",
						transition: "color 0.3s ease",
						transitionDelay: isActive ? "0.4s" : "0s",
					}}
				>
					{screens.md ? data.fullname : data.nickname}
				</Typography.Text>
				<Typography.Text
					className="font-medium nav-subtitle"
					style={{
						color: isActive ? "#878a8f" : "",
						transition: "color 0.3s ease",
						transitionDelay: isActive ? "0.4s" : "0s",
					}}
				>
					{screens.md ? data.role : data.shortrole}
				</Typography.Text>
			</Flex>
		</Flex>
	);
};
