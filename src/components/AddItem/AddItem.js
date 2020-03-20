import React, { useState, useEffect } from 'react';
import classes from './AddItem.module.css';
import CategoriesDropDown from '../CategoriesDropDown/CategoriesDropDown';
import ImageUpload from './ImageUpload/ImageUpload';
import Button from '../../UI/Button/Button';
import imageCompression from 'browser-image-compression';
import { db, storageRef, storage } from '../../config/configfb';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	addItem,
	updateItem,
	clearItemsError,
	resetRedirect
} from '../../store/actions';
import WithModelComponent from '../Model/WithModelComponent';
import { Spring, config } from 'react-spring/renderprops';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorModel from '../Model/withErrorModel';

const AddItem = props => {
	const [inputsS, setInputsS] = useState({
		productName: {
			value: '',
			valid: false,
			errorMessage: null,
			validation: { required: true, max: 55 },
			touched: false
		},
		productPrice: {
			value: '',
			valid: false,
			errorMessage: null,
			validation: { required: true, price: true },
			touched: false
		},
		phoneNo: {
			value: '',
			valid: false,
			errorMessage: null,
			validation: { required: true, phoneNo: true },
			touched: false
		},
		productDesc: {
			value: '',
			valid: false,
			errorMessage: null,
			validation: { required: true },
			touched: false
		}
	});
	const [imagesS, setImagesS] = useState({
		main: { url: null, errorMessage: null, loading: false },
		extra1: { url: null, errorMessage: null, loading: false },
		extra2: { url: null, errorMessage: null, loading: false }
	});

	const [categoryState, setCategoryState] = useState('Categories');
	const [subCategoryState, setSubCategoryState] = useState('SubCategories');

	const [formValidityS, setFormValidityS] = useState(false);

	useEffect(() => {
		setOverallValidity();
	});

	useEffect(() => {
		if (inEditingMode) {
			// fetch item
			const item = props.myItems.find(item => item.itemId === queryItemId);

			// set State
			if (item) {
				setInputsS({
					productName: {
						...inputsS.productName,
						value: item.itemName,
						valid: true
					},
					productPrice: {
						...inputsS.productPrice,
						value: item.itemPrice,
						valid: true
					},
					phoneNo: {
						...inputsS.phoneNo,
						valid: true,
						value: item.ownerContact
					},
					productDesc: {
						...inputsS.productDesc,
						value: item.itemDesc,
						valid: true
					}
				});

				setCategoryState(item.mainCategory);
				setSubCategoryState(item.subCategory);

				let [extra1 = null, extra2 = null] = item.extras;
				setImagesS({
					main: { ...imagesS.main, url: item.mainUrl },
					extra1: { ...imagesS.extra1, url: extra1 },
					extra2: { ...imagesS.extra2, url: extra2 }
				});
			}
		}
	}, []);

	// const queryItemId = new URLSearchParams(useLocation().search).get('itemId');
	const { itemId: queryItemId } = useParams();
	const inEditingMode = queryItemId ? true : false;

	const onCancel = id => {
		deleteImageByUrl(imagesS[id].url);
		setImagesS({ ...imagesS, [id]: { ...imagesS[id], url: null } });
	};

	const onSwitchImage = id => {
		deleteImageByUrl(imagesS[id].url);
	};

	const startUploading = async (id, file) => {
		// start compressing
		// setImagesS({
		// 	...imagesS,
		// 	[id]: { ...imagesS[id], loading: true, errorMessage: null }
		// });

		setImagesS(preState => ({
			...preState,
			[id]: { ...imagesS[id], loading: true, errorMessage: null }
		}));

		const options = {
			maxSizeMB: 0.25,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		};
		const compressedFile = await imageCompression(file, options);
		// upload compressed file
		try {
			const snapshot = await storageRef
				.child('items/' + file.name)
				.put(compressedFile);
			const url = await snapshot.task.snapshot.ref.getDownloadURL();

			// set image
			// setImagesS({
			// 	...imagesS,
			// 	[id]: { ...imagesS[id], loading: false, url, errorMessage: null }
			// });

			setImagesS(preState => ({
				...preState,
				[id]: { ...imagesS[id], loading: false, url, errorMessage: null }
			}));
		} catch (error) {
			// set error
			setImagesS({
				...imagesS,
				[id]: {
					...imagesS[id],
					loading: false,
					errorMessage: 'Something Went Wrong'
				}
			});
		}
	};

	const imagesOnChange = (id, e) => {
		const file = e.target.files[0];
		if (!file) return;
		// validate file
		const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
		const fileSize = file.size / 1000000;
		const validExtensions = ['jpg', 'png', 'jpeg'];
		if (fileSize > 10) {
			setImagesS({
				...imagesS,
				[id]: { ...imagesS[id], errorMessage: 'too big. (max 10mb)' }
			});
			return;
		}
		if (!validExtensions.includes(fileExtension)) {
			setImagesS({
				...imagesS,
				[id]: {
					...imagesS[id],
					errorMessage: `only these extensions are allowed (${validExtensions.join(
						', '
					)})`
				}
			});
			return;
		}

		// compress and upload
		startUploading(id, file);
	};

	const deleteImageByUrl = url => storage.refFromURL(url).delete();

	const setOverallValidity = () => {
		// check inputs
		let isValid = true;
		Object.keys(inputsS).forEach(key => {
			isValid = inputsS[key].valid && isValid;
		});

		// check dropDowns
		if (
			categoryState === 'Categories' ||
			subCategoryState === 'SubCategories'
		) {
			isValid = false;
		}

		//  images validity rule
		//  1- all errorMessages are null
		//  2- none of them is loading
		//  3- main has a url
		let isLoading = false;
		let hasError = false;
		Object.keys(imagesS).forEach(key => {
			isLoading = imagesS[key].loading || isLoading;
			hasError = imagesS[key].errorMessage || hasError;
		});

		if (isLoading || hasError || imagesS.main.url === null) isValid = false;

		setFormValidityS(isValid);
	};

	const inputsOnChange = (e, id) => {
		const value = e.target.value;
		// validate
		const errorMessage = checkValidity(value, inputsS[id].validation);
		// prepare state
		const newState = {
			...inputsS,
			[id]: {
				...inputsS[id],
				valid: errorMessage ? false : true,
				errorMessage,
				value,
				touched: true
			}
		};

		//set the state
		setInputsS(newState);
	};

	const getExtrasArr = () => {
		const urlArr = [];
		Object.keys(imagesS).forEach(key => {
			if (key !== 'main' && imagesS[key].url) {
				urlArr.push(imagesS[key].url);
			}
		});
		return urlArr;
	};

	const onSubmit = e => {
		e.preventDefault();

		const itemToUpload = {
			itemName: inputsS.productName.value,
			itemPrice: Number(inputsS.productPrice.value),
			itemDesc: inputsS.productDesc.value,
			mainCategory: categoryState,
			subCategory: subCategoryState,
			mainUrl: imagesS.main.url,
			extras: getExtrasArr(),
			ownerUid: props.user.uid,
			ownerContact: inputsS.phoneNo.value,
			timeStamp: Date.now()
		};

		if (inEditingMode) {
			props.closeModel();
			props.updateItem(queryItemId, itemToUpload);
		} else {
			props.addItem(itemToUpload);
		}
	};

	const imageUploadsClass = props.withModel
		? classes['form__image-uploads--with-model']
		: classes['form__image-uploads'];

	const formClasses = [classes['form']];
	props.withModel && formClasses.push(classes['form--with-model']);

	props.redirect && props.resetRedirect();
	return (
		<section className={classes['add-item']}>
			{props.redirect && <Redirect to='/my-items' />}
			{props.loading ? (
				<Spinner />
			) : (
				<Spring from={{ opacity: 0, x: 150 }} to={{ opacity: 1, x: 0 }}>
					{animProps => (
						<form className={formClasses.join(' ')}>
							<input
								style={{
									borderColor:
										!inputsS.productName.valid && inputsS.productName.touched
											? 'red'
											: '#00000059',
									opacity: `${animProps.opacity}`,
									transform: `translateX(${animProps.x}%)`
								}}
								value={inputsS.productName.value}
								onChange={e => inputsOnChange(e, 'productName')}
								placeholder='Product Name'
								className={classes['form__input']}
							/>
							<span className={classes['form__error-message']}>
								{inputsS.productName.errorMessage}
							</span>
							<input
								style={{
									borderColor:
										!inputsS.productPrice.valid && inputsS.productPrice.touched
											? 'red'
											: '#00000059',
									opacity: `${animProps.opacity}`,
									transform: `translateX(-${animProps.x}%)`
								}}
								value={inputsS.productPrice.value}
								onChange={e => inputsOnChange(e, 'productPrice')}
								placeholder='Product Price In $'
								className={classes['form__input']}
							/>
							<span className={classes['form__error-message']}>
								{inputsS.productPrice.errorMessage}
							</span>
							<input
								style={{
									borderColor:
										!inputsS.phoneNo.valid && inputsS.phoneNo.touched
											? 'red'
											: '#00000059',
									opacity: `${animProps.opacity}`,
									transform: `translateX(${animProps.x}%)`
								}}
								value={inputsS.phoneNo.value}
								onChange={e => inputsOnChange(e, 'phoneNo')}
								placeholder='Contact Number'
								className={classes['form__input']}
							/>
							<span className={classes['form__error-message']}>
								{inputsS.phoneNo.errorMessage}
							</span>
							<textarea
								style={{
									borderColor:
										!inputsS.productDesc.valid && inputsS.productDesc.touched
											? 'red'
											: '#00000059',
									opacity: `${animProps.opacity}`,
									transform: `translateX(-${animProps.x}%)`
								}}
								value={inputsS.productDesc.value}
								onChange={e => inputsOnChange(e, 'productDesc')}
								placeholder='Product Description'
								className={classes['form__text-area']}
							/>
							<span className={classes['form__error-message']}></span>
							<CategoriesDropDown
								style={{
									opacity: `${animProps.opacity}`,
									transform: `translateX(${animProps.x}%)`,
									zIndex: 1
								}}
								className={classes['drop-downs-container']}
								dropDownsClass={classes['categories__drop-downs']}
								setCategoryState={setCategoryState}
								categoryState={categoryState}
								setSubCategoryState={setSubCategoryState}
								subCategoryState={subCategoryState}
							/>
							<span className={classes['form__error-message']}></span>
							<section
								style={{
									opacity: `${animProps.opacity}`,
									transform: `translateX(-${animProps.x}%)`
								}}
								className={imageUploadsClass}
							>
								<ImageUpload
									inputId='main'
									url={imagesS.main.url}
									onSwitch={() => onSwitchImage('main')}
									onCancel={() => onCancel('main')}
									onChange={e => imagesOnChange('main', e)}
									errorMessage={imagesS.main.errorMessage}
									loading={imagesS.main.loading}
								/>
								<ImageUpload
									inputId='extra1'
									url={imagesS.extra1.url}
									onSwitch={() => onSwitchImage('extra1')}
									onCancel={() => onCancel('extra1')}
									onChange={e => imagesOnChange('extra1', e)}
									errorMessage={imagesS.extra1.errorMessage}
									loading={imagesS.extra1.loading}
								/>
								<ImageUpload
									inputId='extra2'
									url={imagesS.extra2.url}
									onSwitch={() => onSwitchImage('extra2')}
									onCancel={() => onCancel('extra2')}
									onChange={e => imagesOnChange('extra2', e)}
									errorMessage={imagesS.extra2.errorMessage}
									loading={imagesS.extra2.loading}
								/>
							</section>
							<span className={classes['form__error-message']}></span>
							<Button
								onClick={onSubmit}
								className={
									formValidityS ? '' : classes['form__submit-button--disabled']
								}
								hoverable={formValidityS}
								styles={{
									color: '#fff',
									backgroundColor: '#ff0061',
									textAlign: 'center',
									maxWidth: '42rem',
									opacity: `${animProps.opacity}`
								}}
								hoverStyles={{ backgroundColor: '#4e002d', color: '#fff' }}
							>
								{inEditingMode ? 'Edit' : 'Upload'}
							</Button>
						</form>
					)}
				</Spring>
			)}
		</section>
	);
};

const mapStateToProps = ({ auth, items }) => ({
	user: auth.user,
	myItems: items.myItems,
	loading: items.loading,
	hasError: items.error ? true : false,
	redirect: items.redirect
});

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)),
	updateItem: (itemId, item) => dispatch(updateItem(itemId, item)),
	clearItemsError: () => dispatch(clearItemsError()),
	resetRedirect: () => dispatch(resetRedirect())
});

const AddItemWithModel = props => {
	let Component = null;

	if (props.withModel) {
		Component = (
			<WithModelComponent show usingRouter modelClass={classes['model']}>
				{close => <AddItem closeModel={close} {...props} />}
			</WithModelComponent>
		);
		return Component;
	} else {
		Component = withErrorModel(AddItem);
		return <Component {...props} />;
	}
};

// console.log('props', props);
// return (
// 	<WithModelComponent show usingRouter modelClass={classes['model']}>
// 		{() => <AddItem {...props} />}
// 	</WithModelComponent>
// );

export default connect(mapStateToProps, mapDispatchToProps)(AddItemWithModel);

const checkValidity = (val, validationObj) => {
	if (validationObj.required) {
		const isValid = val.trim() !== '';
		if (!isValid) return 'Required Field';
	}
	if (validationObj.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const isValid = pattern.test(val);
		if (!isValid) return 'Invalid Email';
	}
	if (validationObj.phoneNo) {
		const pattern = /^\d+$/;
		const isValid = pattern.test(val);
		if (!isValid) return 'Not A Phone Number';
	}

	if (validationObj.price) {
		const pattern = /^-?\d+\.?\d*$/;
		const isValid = pattern.test(val);
		if (!isValid) return 'Not A Number';
	}

	if (validationObj.max) {
		const isValid = val.length <= validationObj.max;
		if (!isValid) return `Maximum ${validationObj.max} Characters`;
	}
	if (validationObj.min) {
		const isValid = val.length >= validationObj.min;
		if (!isValid) return `Minimum ${validationObj.min} Characters`;
	}

	return null;
};
