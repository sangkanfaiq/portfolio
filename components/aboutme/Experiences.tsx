import { Flex, Typography } from "antd";
import React, { useEffect } from "react";
import { EachItems } from "../EachItems";
import { experiencesCompany } from "@/data";
import Aos from "aos";

const Experiences = () => {
	useEffect(() => {
		Aos.init({
			duration: 600,
			once: true,
		});
	}, []);
	return (
		<Flex data-aos="fade-up" data-aos-offset="50" data-aos-duration="1000" style={{ marginTop: 70 }} justify="center">
			<Flex style={{ width: "100%" }}>
				<Flex vertical gap={12} style={{ flex: 1 }}>
					<EachItems
						data={experiencesCompany}
						render={(item) => (
							<Typography.Text key={item.id} className="font-medium text-sm color-primary">
								{item.company}
							</Typography.Text>
						)}
					/>
				</Flex>
				<Flex vertical gap={12} style={{ flex: 1 }}>
					<EachItems
						data={experiencesCompany}
						render={(item) => (
							<Typography.Text key={item.id} className="font-medium text-sm color-secondary">
								{item.role}
							</Typography.Text>
						)}
					/>
				</Flex>
				<Flex vertical gap={12} style={{ flex: 1 }}>
					<EachItems
						data={experiencesCompany}
						render={(item) => (
							<Typography.Text key={item.id} className="font-medium text-sm color-secondary">
								{item.start} — {item.end}
							</Typography.Text>
						)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Experiences;
