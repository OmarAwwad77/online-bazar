import React from 'react';
import classes from './withModel.module.css';



const withModel = (Component) => {
    return (props) => {
        const backDropCloseHandler = () => (
            props.history.goBack()
        );
        return <div onClick={backDropCloseHandler} className={classes.backdrop}>
            <section onClick={(e) => (e.stopPropagation())} className={classes.model}>
                <div className={classes.cancel} onClick={backDropCloseHandler}>
                    <span></span> <span></span>
                </div>
                {<Component {...props} closeModel={backDropCloseHandler} />}
            </section>

        </div>
    }

}

export default withModel;