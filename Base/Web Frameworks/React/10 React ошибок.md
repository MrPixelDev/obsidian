# 10 React Traps To Avoid As React Developer

![](https://miro.medium.com/max/700/0*OGFBBsLSzv5AIan7.jpeg)

# React Antipatterns

React.js is elegant and minimal on the service. Just write a JavaScript function to represent a component that automatically renders, when your data changes. It is simple but also misleading. In reality, react is a highly complex UI library, with a good amount of technical baggage that has accumulated over the last decade.

Many newer frameworks attempt to do things better, but react is still the king and if you want to be a web developer in 2022, it’s a very good idea to learn it. The problem is that react is unopinionated yet provides many different ways to solve the same problems that leave developers with plenty of room to screw things up with our own stupid ideas.

In today’s article, we’ll look at 10 anti-patterns in react along with tips and tricks to improve our code and also prepare for a front-end technical interview.

# 1. Big Components

When I initially start building react app I usually start by writing one big giant component, often in the app component provided by create react app and that’s intentional, because I usually don’t know how I want my code to be organized initially, and I don’t want to waste my time over organizing things before I even know what I want to do.

However, this results in an anti-pattern of having one overly large, deeply nested component, a component like that It’s hard to understand refactor and test. We can improve that code by refactoring it into reusable components that better represent what it does now that may sound like a lot of work, but luckily there is a vscode extension called glean that can leverage the IDE to do this work for us. It’s a massive time saver that I couldn’t imagine living without.

# 2. Nesting Got you

Now When you start refactoring a large component, you might be tempted into another anti-pattern of nesting components. in this example, we defined a child component that lives inside the parent component,

![](https://miro.medium.com/max/700/0*r7bdC0BLkqI3MgU3)

the child uses a function defined in the parent and by defining it here we don’t need to provide a prop for that function.

![](https://miro.medium.com/max/700/0*2kjseeS3jxjGCxfI)

It feels very intuitive and it works perfectly fine, but there is a major problem here every time the parent component is rendered it will also redefine the child component, which means that gets a new memory address and that could lead to performance issues and unpredictable behavior.

The solution is to either not define a child component at all or to move the child component out of the parent and pass the function in as a prop.

![](https://miro.medium.com/max/700/0*7BuS-auOH3cB3eqD)

This example demonstrates how react is very simple on the surface, but if you don’t know exactly what’s going on, it’s easy to shoot yourself in the foot.

# 3. Failure to Memoize

Here’s a similar example of a component that does too much work and might end up causing performance issues. let’s imagine we have a component with two different pieces of state on one piece of state we need to run an expensive calculation anytime the value changes.

![](https://miro.medium.com/max/700/0*n2XAyRdgYtWlveHF)

The problem with our current implementation is that anytime, the state changes on this component. It will rerun the expensive calculation, even though it only depends on the one count value it’s not very obvious, but you have the potential performance bottleneck here. In a situation like this, you want to use the useMemo hook. What it will do is remember the last value and only run the actual function when it’s dependent data changes.

![](https://miro.medium.com/max/700/0*JS2YFDkFP97PCPTD)

You might also run into the situation when working with functions and for that react, provides useCall back hook.

# 4. Useless Divs

Now another thing you might run into is that when defining a brand new component, you get an error when trying to return to two sibling elements together that’s because every component can have only one root element, so what you might do is wrap it with a div that works perfectly fine, but it leads to a bunch of unnecessary divs in your markup and that can cause issues with accessibility and CSS styling. To address this concern, react has a built in fragment component or better yet you can use the shorthand syntax of an empty element which tells react to render nothing as the parent element.

![](https://miro.medium.com/max/700/0*C01i1DdN9ElFA7_4)

# 5. Messy Files

Now, as your app grows in complexity, and you start creating more and more components, you’ll want to have an opinionated way to organize them. A good rule to follow is one component per file.

It can be tempting to export multiple components from a single file, but things will get pretty complicated quickly if a component is going to be exported, it’s generally best that it lives in it’s own file.

Now in larger projects I would take things one step further and give every component it’s own directory. If you name the file index, then you can easily export it from that directory, but inside the directory you can add other files like a CSS module for example, or anything else you might need for testing, storybook Typescript and so on.

This is how they do things by default in angular, and I find it works really well for large projects. Now there is one drawback when naming your component index and that’s the fact that it’s kind of confusing when working with tabs in your IDE, what you can do, is give your component file a regular name then use the index file to export it that’s called a barrel, and it will keep your imports nice and concise, while also providing a readable file named for the IDE.

# 6. Big Bundles

One of the biggest problems with big complex apps though is that they’re big, and what that means is that when you ship your app to production, it’ll have a slow initial page load, because it takes a long time for the browser to download the javascript bundle.

So what can we do about that? If you’re using a tool like next js or create react app which are built on top of webpack It’s very easy to implement code splitting normally to import code you use the import statement. However, browsers now support dynamic imports, which allows you to load a module asynchronously using the import function when webpack sees that code it automatically knows to split that code into a different bundle which won’t be required until after the initial page load that works fine for plain javascript, but not so much when it comes to react components.

However, react has a feature to support lazy loading, which is still experimental today, but it allows you to use dynamic imports on react components once a component is dynamically imported you can then wrap it in the suspense component to show a fall back UI when it’s loading.

# 7. Prop Drilling

Now another problem you might run into with big projects is that you might have one component at the very top that holds your state but then you have a deeply nested component that also needs to use that state. What you have to do is then pass that state as a prop to a bunch of intermediate components that don’t actually need it until it finally gets to that child.

This is known as prop drilling because it makes you want to drill a hole into your brain. One solution is to bring in a state management library like redux, but that’s a heavy handed approach. When you have global data that’s used everywhere, like an authenticated user, for example. You can share it everywhere with the context API. You first provide the data at a certain point in the component tree then any component nested under it at any level, can access that data sounds awesome, but it does come at a cost the context API is something that you should use sparingly, because it makes your components impossible to reuse without having not provider as a parent.

Most apps only have a handful of values that are truly global. That stuff goes into context while everything else should be more localized.

# 8. Prop Plowing

Prop drilling is a vertical problem, but you might also end up with a horizontal problem called prop plowing, which is a term I just made up. What might happen is that you end up with components that have a lot of different props, and you end up with long repetitive code, where each prop has the same name as the variable passed to it when you have an object that contains all the props that you’re passing to the child, you can use to spread syntax to passed them all at the same time, that makes your code much more concise and personally, I’m a big fan of this. However, it does make your code less explicit, so I typically only recommend using it when you have a component with a ton of props that really justifies it’s use.

# 9. Try Some Curry

Another area where your react code can get pretty messy is with event handlers in jsx. What happens is you might have a function that takes the event as its first argument, but one or more other values as secondary arguments. That means to call it you’ll need to break out an arrow function, and this can get pretty messy if used in multiple places.

A cool little javascript trick here is to create a curried function basically it’s just a function that returns another function. The outer function takes our custom arguments while the inner function handles the event that is passed by default.

This eliminates the need to define an arrow function for each event. Not only does that make your code look a lot cleaner, but it also gives you a a legitimate use case for currying, which will impress your friends and family.

# 10. Code Smarter

And that brings us to anti-pattern number 10. when working with a useState hook in a component It’s tempting to put all of your data in a single object. It makes the code look cleaner and may also seem more performant because you only need to call setState once.

However, what you should know is that react 18 will do automatic batching whenever you update the state. That means calling set state multiple times in the same function will not trigger multiple renders. Therefore, it’s not a big deal for performance, but, more importantly, it makes your code difficult to extract into a custom hook.

In the olden days with react class components, it was common to organize your code into smart components and dumb components where the smart components, control the data and the dumb components just render UI with props.

There is nothing wrong with this pattern, but nowadays it is easier to just extract your logic into a custom hook. What I like to do is build my components with a bunch of different stateful values at first then, if things get too complex or I want to use that code in a different component, I extract it into my own custom hook, which itself is just a javascript function.

This allows you to treat virtually all your components as dumb components, while your custom hooks handle the more complex business logic, and with that we’ve looked at a small preview up the different things you can screw up in react.