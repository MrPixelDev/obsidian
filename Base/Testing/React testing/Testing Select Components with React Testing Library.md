
Testing Select components in React can be challenging due to factors such as simulating user interactions, handling asynchronous behavior, variability in implementation, the complexity of nested components, and accessibility concerns. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) simplifies this process, but it doesn't eliminate all the challenges.

In this post, we'll explore some of the best practices for testing Select components with React Testing Library. We'll begin by writing tests for a wrapper on top of a native HTML `select`, and then proceed to test the components using Select components from the popular [react-select](https://react-select.com/) library. The final code is available on [GitHub](https://github.com/Clarity-89/test-select).

## Setting up

Before writing tests, we'll create a sample React app and install the `react-select` package.

bashCopy

`npx create-react-app test-select`

bashCopy

`npm i react-select`

## Testing native HTML select

We'll begin by testing a component that acts as a wrapper for the native HTML [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) element. Having such a component is quite common, as it abstracts the logic of rendering options.

We'll place all the code inside the **components** folder. We start by creating a **Select.js** file there with our first component.

jsCopy

`// src/components/Select.js   export const Select = ({ options, ...props }) => {   return (     <select {...props}>       {options.map((option) => (         <option key={option.value} value={option.value}>           {option.label}         </option>       ))}     </select>   ); };`

This component accepts an array of options and any additional props. It then renders a `select` element with dynamically generated `option` elements based on the provided options.

With the component in place, we're ready to write tests for it. We'll create a **Select.test.js** file for this purpose.

jsCopy

`// src/components/Select.test.js   import { render, screen } from "@testing-library/react"; import { Select } from "./Select";   const animals = [   { value: "dog", label: "Dog" },   { value: "cat", label: "Cat" },   { value: "lion", label: "Lion" },   { value: "tiger", label: "Tiger" },   { value: "elephant", label: "Elephant" },   { value: "giraffe", label: "Giraffe" },   { value: "zebra", label: "Zebra" },   { value: "penguin", label: "Penguin" },   { value: "panda", label: "Panda" },   { value: "koala", label: "Koala" }, ];   describe("Native select wrapper", () => {   it("should render with default value selected", () => {     render(<Select options={animals} defaultValue={"cat"} />);       expect(screen.getByRole("combobox")).toHaveValue("cat");     expect(screen.getByRole("option", { name: "Cat" }).selected).toBe(true);   }); });`

In this test, we verify that the component correctly displays the default value and that the selected value is properly updated on change. Note that we use the `combobox` role to match the `select` element, as it is its [implicit ARIA role](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#technical_summary) when the `multiple` attribute is absent. Additionally, we also ensure that the `Cat` option has a `selected` attribute, as it's the default selection.

If you're wondering why we're using the `getByRole` query to get the select element instead of, for example, `getByText`, this article provides a detailed explanation for such reasoning, along with other tips for writing React Testing Library tests: [Improving React Testing Library Tests](https://claritydev.net/blog/improving-react-testing-library-tests).

Next, we'll test whether selecting a value works correctly.

jsCopy

`// src/components/Select.test.js   import { render, screen } from "@testing-library/react"; import userEvent from "@testing-library/user-event"; import { Select } from "./Select";   const animals = [   { value: "dog", label: "Dog" },   { value: "cat", label: "Cat" },   { value: "lion", label: "Lion" },   { value: "tiger", label: "Tiger" },   { value: "elephant", label: "Elephant" },   { value: "giraffe", label: "Giraffe" },   { value: "zebra", label: "Zebra" },   { value: "penguin", label: "Penguin" },   { value: "panda", label: "Panda" },   { value: "koala", label: "Koala" }, ];   function setup(jsx) {   return {     user: userEvent.setup(),     ...render(jsx),   }; }   describe("Native select wrapper", () => {   it("should render with default value selected", () => {     setup(<Select options={animals} defaultValue={"cat"} />);       expect(screen.getByRole("combobox")).toHaveValue("cat");     expect(screen.getByRole("option", { name: "Cat" }).selected).toBe(true);   });     it("should select correct value on change", async () => {     const { user } = setup(<Select options={animals} defaultValue={"cat"} />);     await user.selectOptions(screen.getByRole("combobox"), "zebra");       expect(screen.getByRole("combobox")).toHaveValue("zebra");     expect(screen.getByRole("option", { name: "Zebra" }).selected).toBe(true);   }); });`

We use the [user-event](https://testing-library.com/docs/user-event/intro) library to simulate user interactions. First, we write a utility `setup` function that renders the test and sets up the userEvent library. Next, we use its built-in `selectOptions` method, which works well for native `select` elements, and verify that the value changes after selecting an option.

If you want to learn about testing other form components with React Testing Library, you may find this article helpful: [Testing React Hook Form With React Testing Library](https://claritydev.net/blog/testing-react-hook-form-with-react-testing-library).

## Testing react-select with React Testing Library

Testing native `select` elements is relatively straightforward. However, they're not as common in React. Developers often need features like asynchronous option loading, custom display options, and the ability to create custom options. One popular library that addresses these use cases is [react-select](https://react-select.com/home). It's a powerful library that provides React Select components for various situations, making it highly versatile. However, testing such Select components can be challenging due to their custom logic and differences from native elements.

Let's explore how we can test the default `Select` and `AsyncSelect` components using React Testing Library.

### Testing synchronous Select

While we could test the `react-select` component in the same way we tested the native `select` - as a standalone component, it's easier to do so within a form. This approach simplifies querying for the component and validating data changes.

Let's create this `ReactSelectForm` component.

jsCopy

`// src/components/ReactSelectForm.js   import Select from "react-select";   export const ReactSelectForm = (selectProps) => {   const animals = [     { value: "dog", label: "Dog" },     { value: "cat", label: "Cat" },     { value: "lion", label: "Lion" },     { value: "tiger", label: "Tiger" },     { value: "elephant", label: "Elephant" },     { value: "giraffe", label: "Giraffe" },     { value: "zebra", label: "Zebra" },     { value: "penguin", label: "Penguin" },     { value: "panda", label: "Panda" },     { value: "koala", label: "Koala" },   ];     return (     <form aria-label={"animal form"}>       <label htmlFor={"animals"}>Animals</label>       <Select         name={"animals"}         inputId={"animals"}         options={animals}         {...selectProps}       />     </form>   ); };`

A few things are worth noting here. Firstly, we add a descriptive `aria-label` to the `form` so we can query it in the tests and check for form values. We could also use `data-testid`, but `aria-label` provides an [accessible name](https://www.w3.org/TR/accname-1.2/#dfn-accessible-name) to the form. This gives it an [implicit ARIA role](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#technical_summary) attribute of `form`, allowing us to use the `getByRole("form")` query in the tests.

Another modification is the addition of a `label` to the `Select`. Since `react-select` stores the selected value inside an `input` at the base level, we can associate this label with the input by providing an `inputId` prop, which matches the label's `htmlFor` attribute. This enables us to use the `getByLabelText` query to match the component and also improves the field's accessibility. If we had to test the component without a label, in isolation, we would need to use the `getByText` query or wrap the `Select` in a `div` with a `data-testid` to match it, which is not ideal.

Lastly, we add the `name` prop to the `Select` so its value is stored in the form.

Now, we're ready to write the tests.

jsCopy

`// src/components/ReactSelectForm.test.js   import { render, screen } from "@testing-library/react"; import userEvent from "@testing-library/user-event";   import { ReactSelectForm } from "./ReactSelectForm";   function setup(jsx) {   return {     user: userEvent.setup(),     ...render(jsx),   }; }   describe("ReactSelectForm", () => {   it("should render with default value selected", () => {     setup(<ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);     expect(screen.getByText("Cat")).toBeInTheDocument();     expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });   }); });`

As before, we'll start by verifying that the default value is displayed correctly and that it's set on the form.

Next, we'll test whether selecting a new value works properly. This is a tricky part since the `selectOptions` helper won't work here. There are a few ways to test this, and we'll explore two of the most common ones.

The first option is to manually open the select element and click the option we want to select, just as a user would interact with it. We can do this by focusing on the select element, simulating the pressing of the **arrow down** button, and finally clicking on the option to be selected. Alternatively, we can click on the `Select` container, which will focus on it and open the menu.

jsCopy

`// src/components/ReactSelectForm.test.js   it("should select correct value on change", async () => {   const { user } = setup(     <ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />   );     // Alternative: await user.click(screen.getByLabelText("Animals"));   screen.getByLabelText("Animals").focus();   await user.keyboard("[ArrowDown]");     await user.click(screen.getByText("Zebra"));     expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" }); });`

The test passes, however, we notice a lot of warnings in the terminal:

markdownCopy

`Warning: An update to Select inside a test was not wrapped in act(...).   When testing, code that causes React state updates should be wrapped into act(...):`

It turns out that `react-select` performs some state setting behind the scenes, which isn't completely resolved when we query the elements. In React Testing Library versions before 13, it was possible to fix this warning by using `findBy*` as the first query. However, this no longer works starting from version 13, possibly due to the need for compliance with React 18. There's an [open GitHub issue](https://github.com/testing-library/dom-testing-library/issues/1225) related to this.

To fix the warnings, we could wrap all the event calls in a separate `act` function. However, we can simplify this process by using the `waitFor` utility helper to wait for all asynchronous calls to be resolved before querying the elements.

jsCopy

`// src/components/ReactSelectForm.test.js   import { screen, waitFor } from "@testing-library/react";   it("should select correct value on change", async () => {   const { user } = setup(     <ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />   );     await waitFor(async () => {     // await user.click(screen.getByLabelText("Animals"));     screen.getByLabelText("Animals").focus();     await user.keyboard("[ArrowDown]");     await user.click(screen.getByText("Zebra"));   });     expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" }); });`

### Using react-select-event

So far, we've been manually selecting the value from our Select component. The good news is that there's a library that simplifies this process - [react-select-event](https://testing-library.com/docs/ecosystem-react-select-event/).

Let's update our test using this library to see the difference.

jsCopy

`// src/components/ReactSelectForm.test.js   import { select } from "react-select-event";   it("should select correct value on change", async () => {   setup(<ReactSelectForm defaultValue={{ value: "cat", label: "Cat" }} />);     await waitFor(() => select(screen.getByLabelText("Animals"), "Zebra"));     expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" }); });`

This library abstracts away all the manual logic for selecting a value from the `Select` component. We also need to wrap the `select` call in `waitFor` to prevent the `act()` warnings. Additionally, we can create a utility function for further abstraction.

jsCopy

`const selectOptions = async (input, options) => {   await waitFor(() => select(input, options)); };`

Another benefit of using `react-select-event` is that it supports selecting multiple elements using the same API.

jsCopy

`// src/components/ReactSelectForm.test.js   it("should work with multi-select", async () => {   setup(<ReactSelectForm isMulti />);     await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);     expect(screen.getByRole("form")).toHaveFormValues({     animals: ["zebra", "lion"],   }); });`

With this, we have the basic tests for our Select components.

### Testing asynchronous react-select

Testing async react-select is a bit different compared to the default react-select components due to the need to wait for the select options to load before querying the elements.

To demonstrate this testing approach, let's create a new `ReactAsyncSelectForm` component.

jsCopy

`// src/components/ReactAsyncSelectForm.js   import Select from "react-select/async";   export const ReactAsyncSelectForm = (selectProps) => {   const loadOptions = () => {     return new Promise((resolve) => {       resolve([         { value: "dog", label: "Dog" },         { value: "cat", label: "Cat" },         { value: "lion", label: "Lion" },         { value: "tiger", label: "Tiger" },         { value: "elephant", label: "Elephant" },         { value: "giraffe", label: "Giraffe" },         { value: "zebra", label: "Zebra" },         { value: "penguin", label: "Penguin" },         { value: "panda", label: "Panda" },         { value: "koala", label: "Koala" },       ]);     });   };     return (     <form aria-label={"animal form"}>       <label htmlFor={"animals"}>Animals</label>       <Select         name={"animals"}         inputId={"animals"}         loadOptions={loadOptions}         defaultOptions         {...selectProps}       />     </form>   ); };`

The main differences here are that we use the async Select version from `react-select` and that we use a Promise to simulate the async loading of the options. We also add the `defaultOptions` prop to initiate options fetching when the component loads.

Now, we can add the first test.

jsCopy

`// src/components/ReactAsyncSelectForm.test.js   import { render, screen } from "@testing-library/react"; import userEvent from "@testing-library/user-event";   import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";   function setup(jsx) {   return {     user: userEvent.setup(),     ...render(jsx),   }; }   describe("ReactAsyncSelectForm", () => {   it("should render with default value selected", async () => {     setup(       <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />     );     expect(await screen.findByText("Cat")).toBeInTheDocument();     expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });   }); })`

The biggest difference when using async select is that we cannot use synchronous methods (i.e., `getBy*`) to query the elements. We need to wait for the async options to load and the component's state to update accordingly. For this, we can either wrap the queries in the `waitFor` function or use `findBy*` for the first query, as we did in this test. This will wait for the async actions to complete, after which we can query the elements normally.

The rest of the tests will be identical to the synchronous version since we're already using the `waitFor` wrapper there.

jsCopy

`import { render, screen, waitFor } from "@testing-library/react"; import { select } from "react-select-event"; import userEvent from "@testing-library/user-event";   import { ReactAsyncSelectForm } from "./ReactAsyncSelectForm";   function setup(jsx) {   return {     user: userEvent.setup(),     ...render(jsx),   }; }   const selectOptions = async (input, options) => {   await waitFor(() => select(input, options)); };   describe("ReactAsyncSelectForm", () => {   it("should render with default value selected", async () => {     setup(       <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />     );     expect(await screen.findByText("Cat")).toBeInTheDocument();     expect(screen.getByRole("form")).toHaveFormValues({ animals: "cat" });   });     it("should select correct value on change", async () => {     setup(       <ReactAsyncSelectForm defaultValue={{ value: "cat", label: "Cat" }} />     );       await selectOptions(screen.getByLabelText("Animals"), "Zebra");       expect(screen.getByRole("form")).toHaveFormValues({ animals: "zebra" });   });     it("should work with multi-select", async () => {     setup(<ReactAsyncSelectForm inputId={"animals"} isMulti />);       await selectOptions(screen.getByLabelText("Animals"), ["Zebra", "Lion"]);       expect(screen.getByRole("form")).toHaveFormValues({       animals: ["zebra", "lion"],     });   }); });`

## Conclusion

Testing Select components in React is an essential part of the development process to ensure their functionality, behavior, and accessibility. By using React Testing Library, we can write effective tests that cover various scenarios and handle complexities associated with both native select elements and custom Select components from libraries like react-select.

By following the steps outlined in this post, you'll be able to effectively test native selects, synchronous and asynchronous react-select components, and maintain best practices for accessibility.

## References and resources

-   [GitHub with the code for the tutorial](https://github.com/Clarity-89/test-select).
-   [GitHub: waitFor with getAllBy query not equivalent to findAllBy](https://github.com/testing-library/dom-testing-library/issues/1225)
-   [MDN: Form technical summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#technical_summary)
-   [MDN: Select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
-   [MDN: Select technical summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#technical_summary)
-   [React Select](https://react-select.com/)
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
-   [User Event](https://testing-library.com/docs/user-event/intro)
-   [W3C: Accessible name](https://www.w3.org/TR/accname-1.2/#dfn-accessible-name)
-   [react-select-event](https://testing-library.com/docs/ecosystem-react-select-event/)