import React, { useState } from 'react';
import classes from './Filters.module.css';


const Filters = (props) => {

    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [ascending, setAscending] = useState(false);
    const onChangedHandler = (event) => {
        if (event.target.id === 'main') {
            setCategory((event.target.value).toLowerCase() === 'all categories' ? 'all' : (event.target.value).toLowerCase());
            setSubCategory('all')
            return;
        } else if (event.target.id === 'sort') {
            setAscending((state) => {
                return !state
            });

            return;
        }
        setSubCategory((event.target.value).toLowerCase() === 'all subcategories' ? 'all' : (event.target.value).toLowerCase());
    }

    const setOptions = (cat) => {
        if (cat === 'phones') {
            return ['All SubCategories', 'IOS', 'Android'];
        } else if (cat === 'cameras') {
            return ['All SubCategories', 'Canon', 'Sony', 'All brands'];
        } else if (cat === 'laptops') {
            return ['All SubCategories', 'MacOs', 'Windows'];
        } else if (cat === 'tablets') {
            return ['All SubCategories', 'IPad', 'Android'];
        } else {
            return ["All SubCategories"];
        }
    };

    const optionsArray = category ? setOptions(category) : ['All SubCategories'];

    const options = optionsArray.map((cat, index) => {
        return <option key={cat} selected={subCategory === 'all' && index === 0 ? true : null} >{cat}</option>
    }
    );


    return (
        <section className={classes.filters} >
            <select className={classes.select} id="main" onChange={onChangedHandler} >
                <option>All Categories</option>
                <option>Phones</option>
                <option>Cameras</option>
                <option>Laptops</option>
                <option>Tablets</option>
            </select>
            <select className={classes.select} onChange={onChangedHandler} >
                {options}
            </select>
            <select className={classes.select} id="sort" onChange={onChangedHandler}>
                <option>Sort By Price: High to Low</option>
                <option>Sort By Price: Low to High</option>
            </select>

        </section>
    );
}

export default Filters;