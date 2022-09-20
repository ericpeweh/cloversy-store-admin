// Dependencies
import { IEmojiData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Picker = dynamic(() => import("emoji-picker-react"), {
	ssr: false
});

// Styles
import { EmojiPickerContainer } from "./EmojiPicker.styles";

const EmojiPicker = () => {
	const [chosenEmoji, setChosenEmoji] = useState<any>(null);

	const emojiClickHandler = (_: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
		setChosenEmoji(emojiObject);
	};

	return (
		<EmojiPickerContainer>
			<Picker onEmojiClick={emojiClickHandler} disableSkinTonePicker native />
		</EmojiPickerContainer>
	);
};

export default EmojiPicker;