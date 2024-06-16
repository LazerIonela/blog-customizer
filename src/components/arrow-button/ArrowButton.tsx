import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
// export type OnClick = () => void;

//добавлен интерфейс свойств компонента ArrowButton
interface ArrowButtonProps {
	onClick: () => void;
	isOpen: boolean;
}

//добавлены свойства компоненту ArrowButton
export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			//если форма открыта, то применяем стили container_open
			className={clsx(styles.container, isOpen && styles.container_open)}
			//добавлена реакция на клик
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				//если форма открыта, то применяем стили arrow_open
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};


