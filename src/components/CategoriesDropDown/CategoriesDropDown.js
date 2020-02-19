import React from 'react';
import classes from './CategoriesDropDown.module.css';
import DropDown from '../../UI/AngleArrow/DropDown/DropDown';

const CategoriesDropDown = props => {
	const subCategoryList = categoryMainState => {
		if (categoryMainState === 'Phones') {
			const rawArr = ['IOS', 'Android'];
			props.query && rawArr.unshift('All SubCategories');
			return rawArr;
		} else if (categoryMainState === 'Cameras') {
			const rawArr = ['Canon', 'Sony', 'Others'];
			props.query ? rawArr.unshift('All SubCategories') : rawArr.pop();
			!props.query && rawArr.push('Another Brand');
			return rawArr;
		} else if (categoryMainState === 'Laptops') {
			const rawArr = ['MacOs', 'Windows'];
			props.query && rawArr.unshift('All SubCategories');
			return rawArr;
		} else if (categoryMainState === 'Tablets') {
			const rawArr = ['IPad', 'Android'];
			props.query && rawArr.unshift('All SubCategories');
			return rawArr;
		} else {
			return props.query ? ['All SubCategories'] : ['SubCategories'];
		}
	};

	const onChangeHandlerMainCat = value => {
		props.setCategoryState(value);
		props.setSubCategoryState(subCategoryList(value)[0]);
	};
	const onChangeHandlerSubCat = value => {
		props.setSubCategoryState(value);
	};
	const containerClasses = [classes['drop-downs-container']];
	props.className && containerClasses.unshift(props.className);
	return (
		<section
			className={[classes['drop-downs-container'], props.className].join(' ')}
		>
			<DropDown
				className={props.dropDownsClass}
				value={props.categoryState}
				list={['Phones', 'Laptops', 'Cameras', 'Tablets']}
				onChangeHandler={onChangeHandlerMainCat}
			/>
			<DropDown
				className={props.dropDownsClass}
				value={props.subCategoryState}
				list={subCategoryList(props.categoryState)}
				onChangeHandler={onChangeHandlerSubCat}
			/>
		</section>
	);
};

export default CategoriesDropDown;
