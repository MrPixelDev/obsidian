The `:auto-fill` pseudo-class in CSS allows us to style `<input>` elements that contain content auto-filled by the browser.

Take a new user registration form as an example. Have you ever clicked or tapped into a field and seen a dropdown of suggestions for what to enter?

![Animated GIF showing autocompleted content filling the text fields of a form.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2016/04/form-autocomplete.gif?resize=478%2C182&ssl=1)

Notice how the autocompleted fields have a yellow background? That’s how the browser styles a field when it contains auto-filled content. The `:auto-fill` lets us override or extend that with our own styles.

```css
input:auto-fill { 
  outline: 5px solid rgb(0 0 0 / .5);
}
```

### [](https://css-tricks.com/almanac/selectors/a/autofill/#aa-when-does-autocompletion-happen)When does autocompletion happen?

That’s a bit of a tricky question because each browser has its own settings that allow a user to enable or disable auto-completion.

![Safari autofill settings panel.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/09/auto-fill-safari.png?resize=1808%2C644&ssl=1)

Safari

![Auto-fill settings in Chrome's user preferences panel.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/09/auto-fill-chrome.png?resize=2396%2C1366&ssl=1)

Chrome

![Auto-fill settings in Firefox's user preferences panel.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/09/auto-fill-firefox.png?resize=2112%2C940&ssl=1)

Firefox

So, just because you set autocompletion styles on an input with `:auto-fill` doesn‘t mean it’ll actually happen. The user has to enable autocompletion in the browser settings for the feature to work and the styles to be applied.

The other time autocompletion can happen is when the `autocomplete` attribute is applied to a form input:

```html
<input id="name" autocomplete="name">
```

But the attribute is more guidance than a hard rule because there‘s no way to override the auto-fill browser setting directly in CSS if it’s disabled. The HTML Living Standard seems to support that [in a note](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-autofill):

> One way such autofilling might happen is via the `autocomplete` attribute, but user agents could autofill even without that attribute being involved.

And, in most cases, that appears to be the case — at least in our testing.

The HTML `autocomplete` attribute can be used to match certain fields using a token that is mapped to certain fields. See the specification for a [full list of available tokens](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute).

### [](https://css-tricks.com/almanac/selectors/a/autofill/#aa-overriding-user-agent-auto-fill-styles)Overriding user agent `:auto-fill` styles

Browsers often bring their own styling to the table. We call those user agent (UA) styles and they are the reason we have things like [CSS resets](https://css-tricks.com/reboot-resets-reasoning/) to override them for consistent cross-browser initial styles.

We saw earlier that Chrome applies a light yellow `background-color` to auto-filled content. Chrome’s UA styles include:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/09/auto-fill-devtools.png?resize=1024%2C467&ssl=1)

```css
input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: -internal-light-dark(rgb(232, 240, 254), rgba(70, 90, 126, 0.4)) !important;
    color: fieldtext !important;
}
```

[According to MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill), overriding those styles is something we are unable to do in CSS, but [this snippet from Geoff](https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/) seems to do the trick using an inset `box-shadow` to change the `background-color` while using `-webkit-text-fill-color` to change the color of the text:

```css
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #31b0dd;
  -webkit-box-shadow: 0 0 0px 40rem #ffff inset;
}
```

### [](https://css-tricks.com/almanac/selectors/a/autofill/#aa-demo)Demo

Here’s a simple sign-up form that accepts multiple inputs. Notice that when you auto-fill information an animation is triggered on the `outline` property. But, hey, make sure you have auto-filling enabled in your browser settings for it to work. Even then, the browser might need to capture and save information for the fields before it is able to make suggestions.

### [](https://css-tricks.com/almanac/selectors/a/autofill/#aa-browser-support)Browser support

Again, note that `:auto-fill` is currently defined in the HTML Living Standard and has not been [officially defined in the CSS Working Group specifications](https://wiki.csswg.org/spec/css4-ui#more-selectors). As such, no browser has fully implemented `:auto-fill` but do support the vendor prefixed version, `-webkit-autofill`. The support table above reflect support for the prefixed version.