import React, { useState } from 'react';
import classes from './AddItem.module.css';
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown';
import ImageUpload from './ImageUpload/ImageUpload';
import Button from '../../UI/Button/Button';
import imageCompression from 'browser-image-compression';
import { db, storageRef } from '../../config/configfb';
import { connect } from 'react-redux';

const AddItem = props => {
	const [imageUploadsState, setImageUploadsState] = useState({
		mainImage: { url: null, name: '' },
		extra1: { url: null, name: '' },
		extra2: { url: null, name: '' },
		errors: null
	});
	const [formInputsState, setFormInputsState] = useState({
		itemName: { value: '' },
		itemPrice: { value: '', errors: null },
		itemDesc: { value: '' }
	});
	const [overAllFormState, setOverAllFormState] = useState({
		submitted: false
	});

	const [categoryState, setCategoryState] = useState('Categories');
	const [subCategoryState, setSubCategoryState] = useState('SubCategories');

	const formInputsHandler = (e, id) => {
		let errors = null;
		if (id === 'itemPrice') {
			// const pattern = /^\d+$/;
			const pattern = /^-?\d+\.?\d*$/;
			const isValid = pattern.test(e.target.value);
			if (!isValid) {
				if (e.target.value === '') {
					errors = ['required field'];
				} else {
					errors = ['not a number'];
				}
			}
			setFormInputsState({
				...formInputsState,
				[id]: { errors, value: e.target.value }
			});
			return;
		}
		setFormInputsState({
			...formInputsState,
			[id]: { ...formInputsState[id], value: e.target.value }
		});
	};

	const submitHandler = e => {
		e && e.preventDefault();
		setOverAllFormState({ submitted: true });
		if (formInputsState.itemPrice.value.trim() === '') {
			setFormInputsState({
				...formInputsState,
				itemPrice: {
					...formInputsState['itemPrice'],
					errors: ['required field']
				}
			});
		}
		if (imageUploadsState.mainImage.url === null) {
			setImageUploadsState({
				...imageUploadsState,
				errors: ['main image is required']
			});
		}
		if (
			formInputsState.itemPrice.errors === null &&
			formInputsState.itemName.value.trim() !== '' &&
			formInputsState.itemDesc.value.trim() !== '' &&
			formInputsState.itemPrice.value.trim() !== ''
		) {
			if (
				imageUploadsState.mainImage.url !== null &&
				imageUploadsState.errors === null &&
				categoryState !== 'Categories'
			) {
				const itemToUpload = {
					itemName: formInputsState.itemName.value,
					itemPrice: formInputsState.itemPrice.value,
					itemDesc: formInputsState.itemDesc.value,
					mainCategory: categoryState,
					subCategory: subCategoryState,
					mainUrl: null,
					extras: [],
					ownerUid: props.user.uid,
					timeStamp: Date.now()
				};

				const options = {
					maxSizeMB: 0.25,
					maxWidthOrHeight: 1920,
					useWebWorker: true
				};

				let urlCount = 0;
				let imageCount = 0;

				Object.keys(imageUploadsState).forEach(async (key, i) => {
					if (key !== 'errors' && imageUploadsState[key].url) {
						imageCount++;
						const originalFile = await imageCompression.getFilefromDataUrl(
							imageUploadsState[key].url
						);
						const compressedFile = await imageCompression(
							originalFile,
							options
						);
						console.log('index', i);

						if (key === 'mainImage') {
							const snapshot = await storageRef
								.child('items/' + imageUploadsState[key].name)
								.put(compressedFile);
							const url = await snapshot.task.snapshot.ref.getDownloadURL();
							urlCount++;
							itemToUpload.mainUrl = url;
							check(imageCount, urlCount, itemToUpload);
						} else {
							const snapshot = await storageRef
								.child('items/' + imageUploadsState[key].name)
								.put(compressedFile);
							const url = await snapshot.task.snapshot.ref.getDownloadURL();
							urlCount++;
							itemToUpload.extras.push(url);
							check(imageCount, urlCount, itemToUpload);
						}
					}
				});
			}
		}
	};

	const check = (images, urls, item) => {
		if (images === urls) {
			console.log('item ready', item);
			// upload item
			db.collection('items').add(item);
		}
	};
	return (
		<section className={classes['add-item']}>
			<form className={classes['form']} onSubmit={e => submitHandler(e)}>
				<input
					value={formInputsState.itemName.value}
					onChange={e => formInputsHandler(e, 'itemName')}
					placeholder='Product Name'
					className={classes['form__input']}
				/>
				<span className={classes['form__error-message']}>
					{' '}
					{formInputsState.itemName.value.trim() === '' &&
						overAllFormState.submitted &&
						'required field'}{' '}
				</span>
				<input
					value={formInputsState.itemPrice.value}
					onChange={e => formInputsHandler(e, 'itemPrice')}
					placeholder='Product Price'
					className={classes['form__input']}
				/>
				<span className={classes['form__error-message']}>
					{' '}
					{formInputsState.itemPrice.errors &&
						formInputsState.itemPrice.errors.join(' ')}{' '}
				</span>
				<textarea
					value={formInputsState.itemDesc.value}
					onChange={e => formInputsHandler(e, 'itemDesc')}
					placeholder='Product Description'
					className={classes['form__text-area']}
				/>
				<span className={classes['form__error-message']}>
					{' '}
					{formInputsState.itemDesc.value.trim() === '' &&
						overAllFormState.submitted &&
						'required field'}{' '}
				</span>
				<CategoriesDropDown
					setCategoryState={setCategoryState}
					categoryState={categoryState}
					setSubCategoryState={setSubCategoryState}
					subCategoryState={subCategoryState}
				/>
				<span className={classes['form__error-message']}>
					{' '}
					{overAllFormState.submitted && categoryState === 'Categories'
						? 'you must select a category'
						: null}{' '}
				</span>
				<section className={classes['form__image-uploads']}>
					<ImageUpload
						url={imageUploadsState.mainImage.url}
						id='mainImage'
						imageState={imageUploadsState}
						setImageState={setImageUploadsState}
					/>
					<ImageUpload
						url={imageUploadsState.extra1.url}
						id='extra1'
						imageState={imageUploadsState}
						setImageState={setImageUploadsState}
					/>
					<ImageUpload
						url={imageUploadsState.extra2.url}
						id='extra2'
						imageState={imageUploadsState}
						setImageState={setImageUploadsState}
					/>
				</section>
				<span className={classes['form__error-message']}>
					{' '}
					{imageUploadsState.errors && imageUploadsState.errors.join(', ')}{' '}
				</span>
				<Button
					onClick={submitHandler}
					hoverable
					styles={{
						color: '#fff',
						backgroundColor: '#ff0061',
						textAlign: 'center'
					}}
					hoverStyles={{ backgroundColor: '#4e002d', color: '#fff' }}
				>
					Upload
				</Button>
			</form>
		</section>
	);
};

const mapStateToProps = ({ auth }) => ({
	user: auth.user
});

export default connect(mapStateToProps)(AddItem);
