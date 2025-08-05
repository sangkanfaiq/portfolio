import { Flex, Grid, Typography } from "antd";
import React, { useEffect } from "react";
import { EachItems } from "../EachItems";
import { experiencesCompany } from "@/data";
import Aos from "aos";

const Experiences = () => {
	const screens = Grid.useBreakpoint()
	useEffect(() => {
		Aos.init({
			duration: 600,
			once: true,
		});
	}, []);
	return (
		<Flex data-aos="fade-up" data-aos-offset="50" data-aos-duration="1000" style={{ marginTop: 70 }} justify="center">
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
		</Flex>
	);
};

export default Experiences;
