#class #component #react 

```
import React from 'react';


// Создаем компоненту которая расширяет стандартный класс компонента React
class Componnenttu extends React.Component {

    // Стейт - отображаемое состояние
    // Стейт в ООП пишется через конструктор
    // props Передаются при обращении к компоненту <Componenttu arg={77} />
    constructor(props) {
	console.log(props) // {arg: 77}
	// Срабатывает первым в классах, запускается только при создании компонента
	console.log('Constructor');
	// Инициализируем конструктор класса React.Component
        super();
	this.state = {
	    // Если пропсы прилетают в конструктор, то дальнейшее их обновление на компоненту влиять не будут
	    s1: props.arg
	}
    }

    // Статический метод который либо возвращает новые стейты при изменении либо null если ничего не изменилось
    // Статический метод - метод, к которому можно обратиться без создания объекта
    static getDerivedStateFromProps(props, state) {
	console.log('get derived state');
	return null;
	// Данный метод вызывается каждый раз перед перерисовкой, и если туда пришли новые пропсы, он их обновляет в компоненте
	return {"s1": props.arg}
    }


    // Этот метод запускается после render() но один раз при монтировании.
    componentDidMount() {
	console.log('Comp did mount');
    }


    // Этот метод срабатывает когда компонент обновился
    componentDidUpdate() {
        console.log('Comp did update')
    }


    // Какой то локальный метод этого класса (этой компоненты)
    buttonHandler = () => {
        console.log('work');
	let val = this.state.s1;
	val++;
	// Метод, судя по всему наследованный от классa React.Component и меняющий this.state
	// При обновлении стейта render() перезапускается
	this.setState({ s1: val });
    }

    // Метод render() возвращает html-объект и по ходу наследуется от класса React.Component
    render() {
        console.log('render 1');
        return (
            <>
		{console.log('render 2)}
		<div>
		    {*/ На событии клика компонента обращается к своему локальному методу /*}
		    <button onClick={this.buttonHandler}>Push</button>
		</div>
		<div>
		    {this.state.s1}
		</div>
	    </>
        )
    }
}

export default Componnenttu;```