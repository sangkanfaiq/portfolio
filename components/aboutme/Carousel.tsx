import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { carouselImage } from "@/data";
import Aos from "aos";

const CarouselSection: React.FC = () => {
	const carouselRef = useRef<CarouselRef>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);

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

	return (
		<section style={{ padding: "130px 0" }} data-aos="fade-up" data-aos-delay="350" data-aos-offset="-100">
			<div>
				<Carousel ref={carouselRef} autoplay dots={false} beforeChange={handleSlideChange}>
					{carouselImage.map((item: string, index: number) => (
						<img key={index} src={item} width="100%" height={550} alt={`Slide ${index + 1}`} className="monochrome" />
					))}
				</Carousel>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "12px",
					marginTop: "16px",
				}}
			>
				{carouselImage.map((_: string, index: number) => (
					<button
						key={index}
						className="font-regular"
						onClick={() => goToSlide(index)}
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
					</button>
				))}
			</div>
		</section>
	);
};

export default CarouselSection;
