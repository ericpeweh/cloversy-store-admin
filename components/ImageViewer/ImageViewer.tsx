// Dependencies
import React from "react";
import Lightbox, { LightboxProps } from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface ImageViewerProps extends Partial<LightboxProps> {
	isOpen: boolean;
	onClose: () => void;
	imageIndex: number;
}

const ImageViewer = ({ isOpen, onClose, imageIndex, slides }: ImageViewerProps) => {
	return (
		<Lightbox
			open={isOpen}
			close={onClose}
			index={imageIndex}
			slides={slides}
			plugins={[Fullscreen, Thumbnails, Zoom, Counter]}
			counter={{ style: { fontSize: "16px" } }}
			thumbnails={{
				width: 100,
				height: 100,
				vignette: false,
				border: 0,
				gap: 8,
				padding: 2,
				borderRadius: 5,
				showToggle: true
			}}
			zoom={{ maxZoomPixelRatio: 1.3 }}
			styles={{
				container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
				thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.9)" }
			}}
		/>
	);
};

export default ImageViewer;
