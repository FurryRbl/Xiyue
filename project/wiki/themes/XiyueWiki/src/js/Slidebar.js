import "overlayscrollbars/overlayscrollbars.css";
import {
	OverlayScrollbars,
	ScrollbarsHidingPlugin,
	SizeObserverPlugin,
	ClickScrollPlugin,
} from "overlayscrollbars";

const OverlayScrollbarsConfig = {
	scrollbars: {
		theme: "os-theme-dark",
	},
};

const BodySlidebar = OverlayScrollbars(
	document.querySelector("body"),
	OverlayScrollbarsConfig
);
const LeftAside = OverlayScrollbars(
	document.querySelector("#left-aside"),
	OverlayScrollbarsConfig
);
const RightAside = OverlayScrollbars(
	document.querySelector("#right-aside"),
	OverlayScrollbarsConfig
);
