import { Flex, Typography } from "antd";
import React, { useEffect } from "react";
import AOS from "aos";

interface DescriptionInterface {
	title: string;
	description: string;
	subdescription?: string;
	animate?: string;
	delayTitle?: string;
	delayDesc?: string;
	delaySub?: string;
	duration?: string
}

const Description = ({ title, description, subdescription, delayTitle, delayDesc, delaySub }: DescriptionInterface) => {
	useEffect(() => {
		AOS.init({
			duration: 600,
			once: true,
		});
	}, []);
	return (
		<Flex justify="center" align="center" vertical>
			<Flex vertical align="center" style={{textAlign: "center" }}>
				<Typography.Text data-aos="fade-up" data-aos-delay={delayTitle} className="font-regular text-xs color-secondary">
					{title}
				</Typography.Text>
				<h1 data-aos="fade-up" data-aos-delay={delayDesc} className="font-bold text-med color-primary" style={{width: '80%', marginTop: 5}}>
					{description}
				</h1>
				<p data-aos="fade-up" data-aos-delay={delaySub} className="font-medium text-reg color-secondary" style={{width: '70%', marginTop: 25}}>
					{subdescription}
				</p>
			</Flex>
		</Flex>
	);
};

export default Description;
