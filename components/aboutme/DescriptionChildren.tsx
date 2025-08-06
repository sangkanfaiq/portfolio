import { Flex, Grid } from "antd";
import React from "react";
import { motion, Variants } from "framer-motion";

interface DescriptionInterface {
	title: string;
	description: string;
	subdescription?: string;
}

const DescriptionChildren = ({ title, description, subdescription }: DescriptionInterface) => {
	const screens = Grid.useBreakpoint();
	const CONTAINER_VARIANT: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.2,
				staggerChildren: 0.2,
			},
		},
	};

	const ITEMS_VARIANT: Variants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
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
		<Flex justify="center" align="center" vertical>
			<motion.div variants={CONTAINER_VARIANT} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
				<Flex vertical align={screens.md ? "center" : "flex-start"} style={{ textAlign: screens.md ? "center" : "left" }}>
					<motion.p variants={ITEMS_VARIANT} className="font-regular text-xs color-secondary">
						{title}
					</motion.p>
					<motion.h1 variants={ITEMS_VARIANT} className="font-bold text-med color-primary" style={{ width: screens.md ? "80%" : "100%", marginTop: 5 }}>
						{description}
					</motion.h1>
					<motion.p variants={ITEMS_VARIANT} className="font-medium text-reg color-secondary" style={{ width: screens.md ? "70%" : "100%", marginTop: 25 }}>
						{subdescription}
					</motion.p>
				</Flex>
			</motion.div>
		</Flex>
	);
};

export default DescriptionChildren;
