#mobx #state #management

npm i mobx mobx-react::class-components(-lite::func-components)

```
class Counter {
	count = 0; // it is the state
	constructor() {
		makeObservable(this) // makes it observable, but need additional configuration
		makeAutoObservable(this) //
	}
	//any of created functions are ACTIONS
	//unlike redux, states are mutable, so you dont need to return new object after any actions

	increment() {
		this.count++;
	}
	decrement() {
		this.count--;
	}
	
}

export default Counter;
```

	// change some state, mobX captures this and call the component rendering
	// To take effect, use {observer} from 'mobx-react-lite'

```
import {observer} from 'mobx-react-lite';
import counter from "./store/counter";

const Counter = observer(() => {
	return (
		<div className='counter'>
			{"Counte = " + counter.count}
			<div className='btns'>
				<button onClick={() => counter.increment()}>+</button>
				<button onClick={() => counter.decrement()}>-</button>
			</div>
		</div>
	)
})
```

```
import {makeAutoObservable} from 'mobx';
class Todo {
	todos = [
		{id: 1, title:'1', completed: false},
		{id: 2, title:'2', completed: false},
		{id: 3, title:'3', completed: false},
	];
	constructor() {
		makeAutoObservable(this)
	}

	addTodo(todo) {
		this.todos.push(todo)
	}
	removeTodo(id)  {
		this.todos = this.todos.filter(todo => todo.id !== id)
	}
	completeTodo(id)  {
		this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
	}
}

export default new Todo();
```