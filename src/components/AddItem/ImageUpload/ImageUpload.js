import React from 'react';
import classes from './ImageUpload.module.css'
import { ReactComponent as Plus } from '../../../assets/plus.svg'

const imageUpload = (props) => {

    const uploadImageHandler = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            if (validateImage(file)) {
                props.setImageState({ ...props.imageState, errors: validateImage(file) })
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                props.setImageState({ ...props.imageState, [id]: { url: reader.result }, errors: null })
            }
            reader.readAsDataURL(file);
        }
    }

    const validateImage = (file) => {
        let arr = [];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
        const fileSize = file.size / 1000000;
        const validExtensions = ['jpg', 'png', 'jpeg'];
        if (fileSize > 3) {
            arr.push('file is too big. (max 2mb per image)');
        }
        if (!validExtensions.includes(fileExtension)) {
            arr.push(`only these extensions are allowed (${validExtensions.join(', ')})`)
        }

        return arr.length === 0 ? null : arr;
    }

    const clearImageUploads = (id) => {
        props.setImageState({ ...props.imageState, [id]: { url: null } })
    }

    return (
        <div className={classes['image-upload']}>
            <input id={props.id} type="file" onClick={(e) => e.target.value = ''} onChange={(e) => uploadImageHandler(e, props.id)} />
            {props.url ? (
                <div className={classes['image-upload__image-preview']} style={{ backgroundImage: `url(${props.url})` }}>
                    <div className={classes['image-preview__overlay']}>
                        <a onClick={() => clearImageUploads(props.id)} className={classes['overlay__links']} >Cancel</a>
                        <label htmlFor={props.id} className={classes['overlay__links']} >Change</label>
                    </div>
                </div>)
                :
                (
                    <>
                        <label htmlFor={props.id} className={classes['image-upload__icon']}><Plus width="100%" height="100%" /></label>
                        <span>Main Image</span>
                    </>
                )
            }
        </div>
    );
}

export default imageUpload;