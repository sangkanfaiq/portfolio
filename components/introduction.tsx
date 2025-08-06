"use client";
import { introduction } from "@/data";
import { usePageTransition } from "@/hooks/usePageTransition";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const Introduction = () => {
	const { navigateWithTransition, isTransitioning } = usePageTransition();
	const [shouldShowContent, setShouldShowContent] = useState<boolean>(false);

	useEffect(() => {
		if (!isTransitioning) {
			const timer = setTimeout(() => {
				setShouldShowContent(true);
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

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
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
			<motion.div className="intro-wrapper" variants={containerVariants} initial="hidden" animate="visible">
				<motion.p variants={itemVariants} className="font-regular intro-name">
					{introduction.fullname}
				</motion.p>
				<motion.h1 variants={itemVariants} className="font-bold intro-role">
					{introduction.role}
				</motion.h1>
				<motion.p variants={itemVariants} className="font-medium intro-description">
					{introduction.description}
				</motion.p>
				<motion.div variants={itemVariants} className="intro-extra">
					<a href="/projects" className="font-extrabold" onClick={(e) => handleNavigation("/", e)} style={{ cursor: "pointer" }}>
						View Projects
					</a>
					<span className="font-medium">or</span>
					<a href="/aboutme" className="font-extrabold" onClick={(e) => handleNavigation("/aboutme", e)} style={{ cursor: "pointer" }}>
						Read About Me
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Introduction;
