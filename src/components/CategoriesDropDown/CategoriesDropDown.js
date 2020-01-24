import React, { useState } from 'react';
import classes from './CategoriesDropDown.module.css'
import DropDown from '../../UI/AngleArrow/DropDown/DropDown';


const CategoriesDropDown = (props) => {
    
    const subCategoryList = (categoryMainState) => {
        if (categoryMainState === 'Phones') {
            return ['IOS', 'Android'];
        } else if (categoryMainState === 'Cameras') {
            return ['Canon', 'Sony', 'All brands'];
        } else if (categoryMainState === 'Laptops') {
            return ['MacOs', 'Windows'];
        } else if (categoryMainState === 'Tablets') {
            return ['IPad', 'Android'];
        } else {
            return ['SubCategories']
        }
    };

    const onChangeHandlerMainCat = (value) => {
        props.setCategoryState(value);
        props.setSubCategoryState(subCategoryList(value)[0]);

    }
    const onChangeHandlerSubCat = (value) => {
        props.setSubCategoryState(value);
    }
    return (
        <section className={classes['drop-downs-container']}>
            <DropDown size={{ width: '49%', height: '100%' }} value={props.categoryState} list={['Phones', 'Laptops', 'Cameras', 'Tablets']} onChangeHandler={onChangeHandlerMainCat} />
            <DropDown size={{ width: '49%', height: '100%' }} value={props.subCategoryState} list={subCategoryList(props.categoryState)} onChangeHandler={onChangeHandlerSubCat} />
        </section>
    );
}

export default CategoriesDropDown;