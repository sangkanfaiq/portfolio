import { Flex, Grid, Typography } from "antd";
import React, { useEffect } from "react";
import AOS from "aos";

interface DescriptionInterface {
	title: string;
	description: string;
	subdescription?: string;
}

const DescriptionChildren = ({ title, description, subdescription }: DescriptionInterface) => {
	const screens = Grid.useBreakpoint();
	useEffect(() => {
		AOS.init({
			once: true,
		});
	}, []);
	return (
		<Flex justify="center" align="center" vertical data-aos="fade-up" data-aos-offset="50" data-aos-duration="1000">
			<Flex vertical align={screens.md ? "center" : "flex-start"} style={{ textAlign: screens.md ? "center" : "left" }}>
				<Typography.Text className="font-regular text-xs color-secondary">{title}</Typography.Text>
				<h1 className="font-bold text-med color-primary" style={{ width: screens.md ? "80%" : "100%", marginTop: 5 }}>
					{description}
				</h1>
				<p className="font-medium text-reg color-secondary" style={{ width: screens.md ? "70%" : "100%", marginTop: 25 }}>
					{subdescription}
				</p>
			</Flex>
		</Flex>
	);
};

export default DescriptionChildren;
