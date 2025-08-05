"use client";
import CarouselSection from "@/components/aboutme/Carousel";
import Description from "@/components/aboutme/Description";
import DescriptionChildren from "@/components/aboutme/DescriptionChildren";
import Experiences from "@/components/aboutme/Experiences";
import StacksAndTools from "@/components/aboutme/StackAndTools";
import { aboutMe, experiences } from "@/data";
import { Divider, Grid } from "antd";
import React from "react";

const AboutPage = () => {
	const screens = Grid.useBreakpoint()
	return (
		<main style={{ paddingTop: screens.md ? 165 : 72 }}>
			<Description title={aboutMe.title} delayTitle="200" delayDesc="250" delaySub="300" description={aboutMe.description} subdescription={aboutMe.subdescription} />
			<CarouselSection />
			<StacksAndTools />
			<Divider style={{ margin: "108px 0" }} />
			<DescriptionChildren title={experiences.title} description={experiences.description} subdescription={experiences.subdescription} />
			<Experiences />
			<Divider style={{ margin: "108px 0" }} />
		</main>
	);
};

export default AboutPage;
