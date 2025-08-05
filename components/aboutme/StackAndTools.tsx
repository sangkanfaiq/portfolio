import { Flex, Grid } from "antd";
import React, { useEffect } from "react";
import { EachItems } from "../EachItems";
import { skills, tools } from "@/data";
import Aos from "aos";

const StacksAndTools = () => {
	const screens = Grid.useBreakpoint();
	useEffect(() => {
		Aos.init({
			duration: 600,
			once: true,
		});
	}, []);
	return (
		<Flex vertical={!screens.md} data-aos="fade-up" gap={24} data-aos-offset="100" justify="space-around" style={{ width: "100%" }}>
			<Flex vertical align={screens.md ? "center" : "left"} style={{ maxWidth: "500px", textAlign: screens.md ? "center" : "left" }}>
				<p className="font-regular text-xs color-secondary">SKILLS</p>
				<Flex wrap gap={screens.md ? "middle" : "small"} justify={screens.md ? "center" : "flex-start"} style={{ marginTop: 10 }}>
					<EachItems
						data={skills}
						render={(item, index) => {
							const isLast = index === skills.length - 1;
							return (
								<React.Fragment key={index}>
									<span className="font-extrabold text-reg">{item}</span>
									{!isLast && <span className="font-extrabold text-reg color-secondary">/</span>}
								</React.Fragment>
							);
						}}
					/>
				</Flex>
			</Flex>

			<Flex vertical align={screens.md ? "center" : "left"} style={{ maxWidth: "500px", textAlign: screens.md ? "center" : "left" }}>
				<p className="font-regular text-xs color-secondary">TOOLS I USE</p>
				<Flex wrap gap={screens.md ? "middle" : "small"} justify={screens.md ? "center" : "flex-start"} style={{ marginTop: 10 }}>
					<EachItems
						data={tools}
						render={(item, index) => {
							const isLast = index === tools.length - 1;
							return (
								<React.Fragment key={index}>
									<span className="font-extrabold text-reg">{item}</span>
									{!isLast && <span className="font-extrabold text-reg color-secondary">/</span>}
								</React.Fragment>
							);
						}}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default StacksAndTools;
