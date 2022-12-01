#rxjs
RxJS can be really confusing topic for new Angular developers. I was so overwhelmed by RxJS at the beginning. That’s why it’s important to explain the key concepts with simple words.

## What is going on

Imagine the mountain water stream. Narrow and fast _River_. _Someone_ stands right near it’s source and put paper boats on water. _You_ stand down the river and take these boats out.

This is exactly how RxJS works. The core idea of RxJS is the **stream**. You can subscribe to it, modify values and complete it.

Now, let’s put our story to the technical vocabulary.

-   [**Observable**](https://rxjs.dev/guide/observable) is the _River_ itself, the stream. You can stand by the water (subscribe) and wait for the paper boats.
-   [**Observer**](https://rxjs.dev/guide/observer) is _Someone_ standing up the river and putting paper boats on water
-   [**Subscription**](https://rxjs.dev/guide/subscription) is _You_ standing down the river and waiting for a new boat

The naming might be confusing, especially if we take into account the [Observer design pattern](https://refactoring.guru/design-patterns/observer) which RxJS implements. But it is what it is.

![](https://miro.medium.com/max/451/1*sfCXT56DBSEaw4o3OkPxhQ.png)

Basic idea of streams in RxJS

const river$ = new Observable(observer => {  
  // observer puts the boat on water  
  observer.next('Paper boat');  
});  
  
const subscription = river$.subscribe(value => {  
  console.log(value); // 'Paper boat'  
});

## **Cretating an observable**

There are a few ways of creating the stream. Besides straightforward `new Observable()` which we saw before, there are a few more operators.

[**of**](https://www.learnrxjs.io/learn-rxjs/operators/creation/of) — creates a river and puts the boats you specified on water

const river$ = of('Boat 1', 'Boat 2', 'Boat 3');  
  
river$.subscribe(value => console.log(value)); // 'Boat 1' 'Boat 2' 'Boat 3'

[**from**](https://www.learnrxjs.io/learn-rxjs/operators/creation/from) — creates a river and puts on water an array of paper boats. You can pass not only an array, but also a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). It will convert it’s value to Observable

const river$ = from(['Boat 1', 'Boat 2', 'Boat 3']);  
  
river$.subscribe(value => console.log(value)); // 'Boat 1' 'Boat 2' 'Boat 3'

## Subjects

[Subjects](https://www.learnrxjs.io/learn-rxjs/subjects/subject) are **Observable + Observer** combined. In our mountain stream story these are the _Someone_ and the _River_ together. So you can both come to the the river to wait for new paper boat and put it on water.

const river$ = new Subject();  
  
const subscription = river$.subscribe(value => {  
  // you get to this callback after the 'next' method is called  
  console.log('I have got a', value); // I have got a paper boat  
});  
  
river$.next('Paper boat'); // put a boat on water

You have to subscribe before emitting the value. If you come to the river bank after the boat has been put on water, you can sipmly miss it. That’s why you should subscribe first.

But this is not always the case, as we have a friendly guy [**ReplaySubject**](https://www.learnrxjs.io/learn-rxjs/subjects/replaysubject) who tells you about all boats you have missed!

const river$ = new ReplaySubject();  
  
river$.next('Boat 1');  
river$.next('Boat 2');  
  
const subscription = river$.subscribe(value => {  
  console.log(value); // 'First boat' 'Second boat' 'Third boat'  
});  
  
river$.next('Boat 3'); // and one more boat

Also we should mention his cousin [**BehaviourSubject**](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject) which emits the last value at the moment of subscribtion. When you come to the river bank he will say that he saw a “Boat 2” (so you get the value “Boat 2” right after you have subscribed).

## Operators

[Operators](https://www.learnrxjs.io/learn-rxjs/operators) are some random people who stand by the river between _You_ and _Someone_ who put paper boats on the water. They can do different things to the boats and even to the entire _River_!

Operators are placed inside `pipe()` method.

[**take**](https://www.learnrxjs.io/learn-rxjs/operators/filtering/take) — is the guy who let specified amount of boats go, but do not allow others to reach you

const river$ = of('Boat 1', 'Boat 2', 'Boat 3', 'Boat 4');  
  
river$  
  .pipe(  
     take(2)   
  )  
  .subscribe((value) => {  
    console.log(value); // 'Boat 1' 'Boat 2'  
  });

[**filter**](https://www.learnrxjs.io/learn-rxjs/operators/filtering/filter) — is the guy who throws away certain kind of paper boats you specified

![](https://miro.medium.com/max/426/1*fBn84_ukG5dzcWE8HpQXww.png)

filter takes out all red boats

const river$ = of('Red Boat', 'White boat', 'Red Boat', 'Green Boat');  
  
river$  
  .pipe(  
    filter(value => !value.includes('Red'))  
  )  
  .subscribe((value) => {  
    console.log(value); // 'White Boat' 'Green Boat'  
  });

[**map**](https://www.learnrxjs.io/learn-rxjs/operators/transformation/map) — is the guy who take out the boat, do something to it, and put it back. So that you get a transformed boat. In this example, _map_ repaints our boats to red and put it back. So we get red boats.

![](https://miro.medium.com/max/459/1*FYC2ZTDWJiTXqqIzaBMUeQ.png)

map repaints all boats into red

const river$ = of('Boat 1', 'Boat 2', 'Boat 3');  
  
river$  
  .pipe(  
     map(value => 'Red ' + value)   
  )  
  .subscribe((value) => {  
    console.log(value); // 'Red Boat 1' 'Red Boat 2' 'Red Boat 3'  
  });

[**catchError**](https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch) — is the guy who takes care of unexpected situations. If a boat has sunk, you’ll know about it. However, keep in mind that when an error occurs the new boats cannot be put on water (calling next will do nothing).

const river$ = new Observable(observer => {  
  observer.error('Paper boat has sunk:(');  
  observer.next('Another Paper Boat'); // will not be emitted  
});  
  
river$  
  .pipe(  
    catchError(err => of(err))  
  )  
  .subscribe(value => {  
    console.log(value); // Paper boat has sunk:(  
  });

[**tap**](https://www.learnrxjs.io/learn-rxjs/operators/utility/do) — is the kid who sit on the river bank, watch the paper boats passing by and tell his parents about every single boat. He does not influence boats, but it can tell someone else about them. (tap is frequently used for debugging or side-effects)

const river$ = of('Boat 1', 'Boat 2', 'Boat 3');  
  
river$  
  .pipe(  
     tap(value => console.log('I saw ', value))   
     // 'I saw Boat 1' 'I saw Boat 2' 'I saw Boat 3'  
  )  
  .subscribe((value) => {  
    console.log(value); // 'Boat 1' 'Boat 2' 'Boat 3'  
  });

[**switchMap**](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap) **—** is the guy who has built a dam over the river, so now you cannot reach paper boats. But every time there is a paper boat, this guy throws you a pebble from the dam. This way you subscribe not to the paper boats, but to the pebble throw events.

switchMap is usually used to flatten nested subscriptions. For example, you have a first API request and the second one right after it. So you can put your second request to switchMap and subscribe to results of the second request.

![](https://miro.medium.com/max/545/1*6tFo_gFjs2lAkRQtjE0qjQ.png)

switchMap throws you a pebble every time there is a boat

const river$ = of('Boat 1', 'Boat 2', 'Boat 3');  
  
river$  
  .pipe(  
    switchMap(value => of('Pebble'))  
  )  
  .subscribe((value) => {  
    console.log(value); // 'Pebble' 'Pebble' 'Pebble'  
  });

You can also **combine operators.** The river bank is big, so you can pass as many operators as you want to the `pipe()` method. They are executed in the order you put them. In the example below, first we filter red boats out and then take only first boat.

const river$ = of('Red Boat', 'White boat', 'Red Boat', 'Green Boat');  
  
river$  
  .pipe(  
    filter(value => !value.includes('Red')),  
    take(1)  
  )  
  .subscribe((value) => {  
    console.log(value); // 'White Boat'  
  });

RxJS is really big and complex. Some things are really tricky. But I hope this article helped you to understand the idea of some basic concepts and operators. You can learn more about this amazing library on [https://www.learnrxjs.io/](https://www.learnrxjs.io/)

Thank you for reading! Let me know if you like it or not in the comments;)