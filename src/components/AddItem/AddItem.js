import React, { useState, useEffect } from 'react';
import classes from './AddItem.module.css';
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown';
import ImageUpload from './ImageUpload/ImageUpload';
import Button from '../../UI/Button/Button';
import imageCompression from 'browser-image-compression';
import { db, storageRef, storage } from '../../config/configfb';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateItem } from '../../store/actions';

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

	const queryItemId = new URLSearchParams(useLocation().search).get('itemId');
	const isInEditingMode = queryItemId ? true : false;

	useEffect(() => {
		if (isInEditingMode) {
			// get the item
			const item = props.myItems.find(item => item.itemId === queryItemId);

			// set images
			const imagesState = {
				...imageUploadsState,
				mainImage: { url: item.mainUrl, name: '' }
			};
			switch (item.extras.length) {
				case 1:
					setImageUploadsState({
						...imagesState,
						extra1: { url: item.extras[0], name: '' }
					});
					break;
				case 2:
					setImageUploadsState({
						...imagesState,
						extra1: { url: item.extras[0], name: '' },
						extra2: { url: item.extras[1], name: '' }
					});
					break;
				default:
					break;
			}

			// set categories
			setCategoryState(item.mainCategory);
			setSubCategoryState(item.subCategory);

			// set inputs
			setFormInputsState({
				itemName: { value: item.itemName },
				itemPrice: { value: item.itemPrice, errors: null },
				itemDesc: { value: item.itemDesc }
			});
		}
	}, []);

	const deleteImageByUrl = url => storage.refFromURL(url).delete();

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

	const checkExtras = (item, key) => {
		switch (key) {
			case 'extra1':
				item.extras[0] && deleteImageByUrl(item.extras[0]);
				break;

			case 'extra2':
				item.extras[1] && deleteImageByUrl(item.extras[1]);
				break;
			default:
		}
	};

	const submitHandler = e => {
		e && e.preventDefault();
		setOverAllFormState({ submitted: true });
		if (formInputsState.itemPrice.value.trim() === '') {
			// set price errors
			setFormInputsState({
				...formInputsState,
				itemPrice: {
					...formInputsState['itemPrice'],
					errors: ['required field']
				}
			});
		}
		if (imageUploadsState.mainImage.url === null) {
			// set main image errors
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
					mainUrl: imageUploadsState.mainImage.url,
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
						if (isInEditingMode) {
							const item = props.myItems.find(
								item => item.itemId === queryItemId
							);
							if (key === 'mainImage') {
								if (imageUploadsState[key].url === item.mainUrl) {
									imageCount++;
									urlCount++;
									check(imageCount, urlCount, itemToUpload);
									return;
								} else {
									deleteImageByUrl(item.mainUrl);
								}
							} else {
								const exists = item.extras.includes(imageUploadsState[key].url);
								if (exists) {
									imageCount++;
									urlCount++;
									itemToUpload.extras.push(imageUploadsState[key].url);
									check(imageCount, urlCount, itemToUpload);
									return;
								} else {
									checkExtras(item, key);
								}
							}
						}
						imageCount++;
						console.log('compressing');
						const originalFile = await imageCompression.getFilefromDataUrl(
							imageUploadsState[key].url
						);
						const compressedFile = await imageCompression(
							originalFile,
							options
						);

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
					} else if (
						key !== 'errors' &&
						!imageUploadsState[key].url &&
						isInEditingMode
					) {
						const item = props.myItems.find(
							item => item.itemId === queryItemId
						);
						checkExtras(item, key);
					}
				});
			}
		}
	};

	const check = (images, urls, item) => {
		if (images === urls) {
			console.log('item ready', item);
			// upload item or update
			if (isInEditingMode) {
				props.updateItem(queryItemId, item);
			} else {
				db.collection('items')
					.add(item)
					.then(() => console.log('item added check firebase'));
			}
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
					placeholder='Product Price In $'
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
						isInEditingMode={isInEditingMode}
						url={imageUploadsState.mainImage.url}
						id='mainImage'
						imageState={imageUploadsState}
						setImageState={setImageUploadsState}
					/>
					<ImageUpload
						isInEditingMode={isInEditingMode}
						url={imageUploadsState.extra1.url}
						id='extra1'
						imageState={imageUploadsState}
						setImageState={setImageUploadsState}
					/>
					<ImageUpload
						isInEditingMode={isInEditingMode}
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
					{isInEditingMode ? 'Edit' : 'Upload'}
				</Button>
			</form>
		</section>
	);
};

const mapStateToProps = ({ auth, items }) => ({
	user: auth.user,
	myItems: items.myItems
});

const mapDisptachToProps = dispatch => ({
	updateItem: (itemId, item) => dispatch(updateItem(itemId, item))
});

export default connect(mapStateToProps, mapDisptachToProps)(AddItem);
