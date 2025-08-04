import { Flex } from "antd";
import React, { useEffect } from "react";
import { EachItems } from "../EachItems";
import { skills, tools } from "@/data";
import Aos from "aos";

const StacksAndTools = () => {
	useEffect(() => {
		Aos.init({
			duration: 600,
			once: true,
		});
	}, []);
	return (
		<Flex data-aos="fade-up" data-aos-offset="100" justify="space-around" style={{ width: "100%" }}>
			<Flex vertical align="center" style={{ maxWidth: "500px", textAlign: "center" }}>
				<p className="font-regular text-xs color-secondary">SKILLS</p>
				<Flex wrap gap="middle" justify="center" style={{ marginTop: 10 }}>
					<EachItems
						data={skills}
						render={(item, index) => {
							const isLast = index === skills.length - 1;
							return (
								<React.Fragment key={index}>
									<span className="font-bold text-reg">{item}</span>
									{!isLast && <span className="font-bold text-reg color-secondary">/</span>}
								</React.Fragment>
							);
						}}
					/>
				</Flex>
			</Flex>

			<Flex vertical align="center" style={{ maxWidth: "500px", textAlign: "center" }}>
				<p className="font-regular text-xs color-secondary">TOOLS I USE</p>
				<Flex wrap gap="middle" justify="center" style={{ marginTop: 10 }}>
					<EachItems
						data={tools}
						render={(item, index) => {
							const isLast = index === tools.length - 1;
							return (
								<React.Fragment key={index}>
									<span className="font-bold text-reg">{item}</span>
									{!isLast && <span className="font-bold text-reg color-secondary">/</span>}
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
