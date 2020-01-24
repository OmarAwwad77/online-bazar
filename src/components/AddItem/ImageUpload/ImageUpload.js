import React from 'react';
import classes from './ImageUpload.module.css'
import { ReactComponent as Plus } from '../../../assets/plus.svg'

const imageUpload = (props) => {
    return (
        <div className={classes['image-upload']}>
            <input id={props.id} type="file" onClick={(e) => e.target.value = ''} onChange={(e) => props.onChange(e, props.id)} />
            {props.url ? (
                <div className={classes['image-upload__image-preview']} style={{ backgroundImage: `url(${props.url})` }}>
                    <div className={classes['image-preview__overlay']}>
                        <a onClick={() => props.clear(props.id)} className={classes['overlay__links']} >Cancel</a>
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