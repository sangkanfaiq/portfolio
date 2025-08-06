import { useState } from "react";

const [targetPath, setTargetPath] = useState("");
export const renderPathname = () => {
	if (targetPath === "/aboutme") return "about me";
	if (targetPath === "/contact") return "contact";
	return "welcome";
};

export const renderSubtitle = () => {
	if (targetPath === "/aboutme") return "Frontend Developer";
	if (targetPath === "/contact") return "Get in touch";
	return "Wait a bit";
};
