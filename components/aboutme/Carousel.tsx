import React, { useEffect, useRef, useState } from "react";
import { Carousel, Flex, Grid } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { carouselImage } from "@/data";
import Aos from "aos";
import { motion, Variants } from "framer-motion";

const CarouselSection: React.FC = () => {
	const carouselRef = useRef<CarouselRef>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const screens = Grid.useBreakpoint();

	useEffect(() => {
		Aos.init({
			duration: 600,
			once: true,
		});
	}, []);

	const handleSlideChange = (_: number, next: number): void => {
		setActiveIndex(next);
	};

	const goToSlide = (index: number): void => {
		carouselRef.current?.goTo(index);
	};

	const CONTAINER_VARIANT: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.8,
				staggerChildren: 0.2,
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.section style={{ padding: screens.md ? "130px 0" : "72px 0" }} variants={CONTAINER_VARIANT} initial="hidden" animate="visible">
			<Carousel ref={carouselRef} autoplay dots={false} beforeChange={handleSlideChange}>
				{carouselImage.map((item: string, index: number) => (
					<motion.img key={index} src={item} width="100%" height={550} alt={`Slide ${index + 1}`} className="monochrome" />
				))}
			</Carousel>

			<Flex
				justify="center"
				gap="middle"
				style={{
					marginTop: 12,
				}}
			>
				{carouselImage.map((_, index: number) => (
					<motion.button
						key={index}
						onClick={() => goToSlide(index)}
						className="font-regular"
						style={{
							background: "none",
							border: "none",
							fontWeight: "bold",
							fontSize: "0.875rem",
							color: index === activeIndex ? "#0f141e" : "#878a8f",
							cursor: "pointer",
							padding: "4px 8px",
							borderRadius: "4px",
							transition: "color 0.3s ease",
						}}
					>
						{String(index + 1).padStart(2, "0")}
					</motion.button>
				))}
			</Flex>
		</motion.section>
	);
};

export default CarouselSection;
