import React, { useState, useEffect } from 'react';
import classes from './Filters.module.css';
import Button from '../../../UI/Button/Button';
import CategoriesDropDown from '../../CategoriesDropDown/CategoriesDropDown';
import DropDown from '../../../UI/AngleArrow/DropDown/DropDown';
import { connect } from 'react-redux';
import { queryItems } from '../../../store/actions';
import { withRouter } from 'react-router-dom';

const Filters = props => {
	const [category, setCategory] = useState('Laptops');
	const [subCategory, setSubCategory] = useState('All SubCategories');
	const [ascending, setAscending] = useState('Sort By Price: Low to High');

	useEffect(() => {
		setCategory(props.toolbarQuery.category);
		setSubCategory(props.toolbarQuery.subCategory);
		query(props.toolbarQuery);
	}, [props.toolbarQuery]);

	const query = queryState => {
		const asc =
			queryState.ascending === 'Sort By Price: Low to High' ? true : false;
		const queryObj = { asc };
		if (queryState.category === 'All Categories') {
			props.queryItems(queryObj, true);
		} else if (queryState.subCategory === 'All SubCategories') {
			queryObj['mainCategory'] = queryState.category;
			props.queryItems(queryObj);
		} else {
			props.queryItems({
				...queryObj,
				mainCategory: queryState.category,
				subCategory: queryState.subCategory
			});
		}
	};

	return (
		<section className={classes.filters}>
			<CategoriesDropDown
				query
				className={classes['drop-downs-container']}
				setCategoryState={setCategory}
				setSubCategoryState={setSubCategory}
				categoryState={category}
				subCategoryState={subCategory}
			/>
			<DropDown
				className={classes['drop-down']}
				value={ascending}
				list={['Sort By Price: High to Low', 'Sort By Price: Low to High']}
				onChangeHandler={setAscending}
			/>
			<Button
				onClick={() => query({ category, subCategory, ascending })}
				styles={{
					margin: '0',
					marginLeft: '1rem',
					backgroundColor: '#4e002d',
					color: '#fff'
				}}
				hoverable
			>
				Search
			</Button>
		</section>
	);
};

const mapDispatchToProps = dispatch => ({
	queryItems: (queryObj, all) => dispatch(queryItems(queryObj, all))
});

const mapStateToProps = ({ items }) => ({
	toolbarQuery: items.toolbarQuery
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Filters));
