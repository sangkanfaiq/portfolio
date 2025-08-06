import { Flex, Grid } from "antd";
import React from "react";
import { EachItems } from "../EachItems";
import { skills, tools } from "@/data";
import { Variants, motion } from "framer-motion";

const StacksAndTools = () => {
	const screens = Grid.useBreakpoint();
	const CONTAINER_VARIANT: Variants = {
		hidden: { opacity: 0, y: 40 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};
	return (
		<motion.section variants={CONTAINER_VARIANT} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
			<Flex vertical={!screens.md} gap={24} justify="space-around" style={{ width: "100%" }}>
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
		</motion.section>
	);
};

export default StacksAndTools;
