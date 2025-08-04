export interface PageTransitionContextType {
	navigateWithTransition: (path: string, blank?: boolean, fromMenu?: boolean) => void;
	isTransitioning: boolean;
	setIsTransitioning: (value: boolean) => void;
}
