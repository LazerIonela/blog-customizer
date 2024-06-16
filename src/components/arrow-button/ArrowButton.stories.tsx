import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

// компонент, управляющий состоянием
const ArrowButtonWithState = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
		console.log('CLICKED', !isOpen);
	};
	return <ArrowButton isOpen={isOpen} onClick={handleClick} />;
};
// История для storybook
export const ArrowButtonStory: Story = {
	render: () => <ArrowButtonWithState />,
};

