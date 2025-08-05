"use client";
import { introduction } from "@/data";
import { usePageTransition } from "@/hooks/usePageTransition";
import Aos from "aos";
import React, { useEffect, useState } from "react";

const Introduction = () => {
	const { navigateWithTransition, isTransitioning } = usePageTransition();
	const [shouldShowContent, setShouldShowContent] = useState(false);

	useEffect(() => {
		if (!isTransitioning) {
			const timer = setTimeout(() => {
				setShouldShowContent(true);
				Aos.init({
					duration: 600,
					once: false,
				});
				setTimeout(() => {
					Aos.refresh();
				}, 50);
			}, 200);

			return () => clearTimeout(timer);
		} else {
			setShouldShowContent(false);
		}
	}, [isTransitioning]);

	const handleNavigation = (path: string, e: React.MouseEvent) => {
		e.preventDefault();
		navigateWithTransition(path);
	};

	if (!shouldShowContent) {
		return (
			<section className="intro">
				<div className="intro-wrapper"></div>
			</section>
		);
	}

	return (
		<section className="intro">
			<div className="intro-wrapper">
				<p data-aos="fade-up" data-aos-delay="100" className="font-regular intro-name">
					{introduction.name}
				</p>
				<h1 data-aos="fade-up" data-aos-delay="150" className="font-bold intro-role">
					{introduction.role}
				</h1>
				<p data-aos="fade-up" data-aos-delay="200" className="font-medium intro-description">
					{introduction.description}
				</p>
				<div className="intro-extra" data-aos="fade-up" data-aos-delay="250">
					<a href="/projects" className="font-extrabold" onClick={(e) => handleNavigation("/", e)} style={{ cursor: "pointer" }}>
						View Projects
					</a>
					<span className="font-medium">or</span>
					<a href="/aboutme" className="font-extrabold" onClick={(e) => handleNavigation("/aboutme", e)} style={{ cursor: "pointer" }}>
						Read About Me
					</a>
				</div>
			</div>
		</section>
	);
};

export default Introduction;
