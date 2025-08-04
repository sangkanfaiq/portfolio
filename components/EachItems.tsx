import { ReactNode, Children } from "react";

type EachItemsProps<T> = {
	render: (item: T, index: number) => ReactNode;
	data: T[];
};

export const EachItems = <T,>({ render, data }: EachItemsProps<T>) => <>{Children.toArray(data?.map((item, index) => render(item, index)))}</>;
