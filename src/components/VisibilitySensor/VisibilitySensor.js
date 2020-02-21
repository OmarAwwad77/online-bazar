import React, { useState } from 'react';
import Vsensor from 'react-visibility-sensor';

const VisibilitySensor = props => {
	const [activeS, setActive] = useState(true);
	const { once, children, ...theRest } = props;

	return (
		<Vsensor
			active={activeS}
			onChange={isVisible => isVisible && activeS && once && setActive(false)}
			{...theRest}
		>
			{({ isVisible }) => children(isVisible)}
		</Vsensor>
	);
};

export default VisibilitySensor;

// 	 <VisibilitySensor once>
// 	{({ isVisible }) => (
// 		<Spring
// 			from={{ opacity: 0 }}
// 			to={{ opacity: isVisible ? 1 : 0 }}
// 			config={{ mass: 1, friction: 26, tension: 30 }}
// 		>
// 			{animProps => (
// 				<H2 style={animProps} id='products'>
// 					filter products by categories
// 				</H2>
// 			)}
// 		</Spring>
// 	)}
// </VisibilitySensor>
