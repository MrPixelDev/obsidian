#function #component #react 

```
import React from 'react';
import { useState, useEffect } from 'react';


// При любом изменении компоненты перезапускается функция полностью, как например при вызове buttonHandler
export const Componnenttu = (props) => {

    const [s1, setS1] = useState(props.arg);

    console.log('render 1');
    const buttonHandler = () => {
	let val = s1;
	val++;
	setS1(val);
    }

    // Функция, переданная внутрь useEffect, срабатывает при эффектах в компоненте
    useEffect(() => {
        // Срабатывает после рендера
	console.log('useEffect');
    }, []);

    return (
	<>
	    {console.log('render 2')}
	    <div>
		<button onClick={buttonHandler}>Push</button>
	    </div>
	    <div>
		{state.s1}
	    </div>
	</>
    )
}

```
