import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Text } from '../text';

interface ArticleParamsFormProp {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProp) => {
	//используем useRef для получения ссылки на DOM-элемент
	const formRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const [currentFont, setCurrentFont] = useState(articleState.fontFamilyOption);
	const [currentTextSize, setCurrentTextSize] = useState(
		articleState.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		articleState.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [currentPageWidth, setCurrentPageWidth] = useState(
		articleState.contentWidth
	);

	//функция управления состоянием открытия и закрытия элемента
	function handleClick() {
		setIsOpen((currentState) => !currentState);
	}

	//функция сброса состояния формы
	function resetFormState() {
		setArticleState(defaultArticleState);
		setCurrentFont(defaultArticleState.fontFamilyOption);
		setCurrentTextSize(defaultArticleState.fontSizeOption);
		setCurrentFontColor(defaultArticleState.fontColor);
		setCurrentBackgroundColor(defaultArticleState.backgroundColor);
		setCurrentPageWidth(defaultArticleState.contentWidth);
		handleClick();
	}

	//функция обновления формы при применении параметров, выбранных пользователем
	function submitFormState(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const updatedState: ArticleStateType = {
			fontFamilyOption: currentFont,
			fontSizeOption: currentTextSize,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentPageWidth,
		};
		setArticleState(updatedState);
		handleClick();
	}

	//пользовательский хук, который следит за кликами вне компонента и вызывает onChange для изменения его состояния
	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onClose: handleClick,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={submitFormState}
					onReset={resetFormState}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={currentFont}
						options={fontFamilyOptions}
						onChange={setCurrentFont}
						title='Шрифт'
					/>
					<RadioGroup
						selected={currentTextSize}
						name='radio'
						onChange={setCurrentTextSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={currentFontColor}
						options={fontColors}
						onChange={setCurrentFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={currentBackgroundColor}
						options={backgroundColors}
						onChange={setCurrentBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={currentPageWidth}
						options={contentWidthArr}
						onChange={setCurrentPageWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};


