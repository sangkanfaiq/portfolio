import { Flex, Grid, Typography } from "antd";
import React, { useEffect } from "react";
import { EachItems } from "../EachItems";
import { experiencesCompany } from "@/data";
import { Variants, motion } from "framer-motion";

const Experiences = () => {
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
		<Flex style={{ marginTop: screens.md ? 70 : 35 }} justify="center">
			<motion.div variants={CONTAINER_VARIANT} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
				<Flex wrap style={{ width: "100%" }}>
					<EachItems
						data={experiencesCompany}
						render={(item, index) => (
							<Flex vertical={!screens.md} key={index} gap={screens.md ? 24 : 0} style={{ width: "100%", marginTop: screens.md ? 12 : 24 }}>
								<Typography.Text style={{ flex: 1 }} className="font-medium text-sm color-primary">
									{item.company}
								</Typography.Text>
								<Typography.Text style={{ flex: 1 }} className="font-medium text-sm color-secondary">
									{item.role}
								</Typography.Text>
								<Typography.Text style={{ flex: 1 }} className="font-medium text-sm color-secondary">
									{item.start} — {item.end}
								</Typography.Text>
							</Flex>
						)}
					/>
				</Flex>
			</motion.div>
		</Flex>
	);
};

export default Experiences;
