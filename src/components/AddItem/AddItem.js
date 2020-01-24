import React, { useState } from 'react';
import classes from './AddItem.module.css';
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown';
import ImageUpload from './ImageUpload/ImageUpload';
import Button from '../../UI/Button/Button';

const AddItem = (props) => {
    const [imageUploadsState, setImageUploadsState] = useState
        (
            {
                mainImage: { url: null },
                extra1: { url: null },
                extra2: { url: null }
            }
        );
    const [formInputsState, setFormInputsState] = useState
        ({
            itemName: '',
            itemPrice: '',
            itemDesc: ''
        });

    const [categoryState, setCategoryState] = useState('Categories');
    const [subCategoryState, setSubCategoryState] = useState('SubCategories');

    const formInputsHandler = (e, id) => {
        setFormInputsState({ ...formInputsState, [id]: e.target.value })
    }

    const uploadImageHandler = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUploadsState({ ...imageUploadsState, [id]: { url: reader.result } })
            }
            reader.readAsDataURL(file);
        }
    }
    const clearImageUploads = (id) => {
        setImageUploadsState({ ...imageUploadsState, [id]: { url: null } })
    }

    const submitHandler = (e) => {
        e && e.preventDefault();
        console.log();
    }
    return (
        <section className={classes['add-item']}>
            <form className={classes['form']} onSubmit={(e) => submitHandler(e)} >
                <input value={formInputsState.itemName} onChange={(e) => formInputsHandler(e, 'itemName')} placeholder="Item Name" className={classes['form__input']} />
                <input value={formInputsState.itemPrice} onChange={(e) => formInputsHandler(e, 'itemPrice')} placeholder="Item Price" className={classes['form__input']} />
                <textarea value={formInputsState.itemDesc} onChange={(e) => formInputsHandler(e, 'itemDesc')} placeholder="Description" className={classes['form__text-area']} />
                <CategoriesDropDown 
                setCategoryState= {setCategoryState} 
                categoryState={categoryState}
                setSubCategoryState={setSubCategoryState}
                subCategoryState={subCategoryState}
                />
                <section className={classes['form__image-uploads']}>
                    <ImageUpload url={imageUploadsState.mainImage.url} id="mainImage" clear={clearImageUploads} onChange={uploadImageHandler} />
                    <ImageUpload url={imageUploadsState.extra1.url} id="extra1" clear={clearImageUploads} onChange={uploadImageHandler} />
                    <ImageUpload url={imageUploadsState.extra2.url} id="extra2" clear={clearImageUploads} onChange={uploadImageHandler} />
                </section>
                <Button
                    onClick={submitHandler}
                    hoverable
                    styles={{ color: '#fff', backgroundColor: '#4e002d', textAlign: 'center' }}
                    hoverStyles={{ backgroundColor: '#ff0061', color: '#fff' }}
                >
                    Upload
                </Button>
            </form>
        </section>
    );
}

export default AddItem;