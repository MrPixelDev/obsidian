#css #pseudo

# 1. The `::selection` Pseudo-Element

The `::selection` pseudo-element targets the portion of the text that a user has selected. It provides a way to apply styles to the selected text and customize its appearance. Here's an example:

::selection {  
  background-color: yellow;  
  color: red;  
}

In the above code, when a user selects text on the page, it will be highlighted with a yellow background and red text color.

![](https://miro.medium.com/v2/resize:fit:700/1*TSJXfdbSVVtI8h7VSS8_wg.png)

# 2. The `::first-letter` Pseudo-Element

The `::first-letter` pseudo-element allows you to style the first letter of a block-level element. It comes in handy when you want to apply special formatting to the initial character of a paragraph or heading. Here's an example:

p::first-letter {  
  font-size: 2em;  
  color: red;  
}

In the above code snippet, the first letter of every paragraph will be displayed in larger font size and have a red color.

![](https://miro.medium.com/v2/resize:fit:700/1*E2SWTzGIpnoq6l-mXWYxoA.png)

# 3. The `::first-line` Pseudo-Element

Similar to `::first-letter`, the `::first-line` pseudo-element targets the first line of a text or block-level element. You can apply specific styles to the initial line of a paragraph or a headline using this pseudo-element. Here's an example:

p::first-line {  
  font-weight: bold;  
  text-decoration: underline;  
}

In the above code, the first line of every paragraph will be displayed in bold and underlined.

![](https://miro.medium.com/v2/resize:fit:610/1*0ElvvuuiltWxkX3rBWrJCg.png)

# 4. The `::marker` Pseudo-Element

The `::marker` pseudo-element targets the marker of a list item, such as the bullet point in an unordered list or the number in an ordered list. With this pseudo-element, you can customize the appearance of the markers. Here's an example:

li::marker {  
  color: blue;  
  font-weight: bold;  
}

![](https://miro.medium.com/v2/resize:fit:600/1*kf1Hz_RfG2piVBp1XRFCQw.png)

# 5. The `::placeholder` Pseudo-Element

The `::placeholder` pseudo-element allows you to style the placeholder text in input fields and text areas. By applying custom styles to the placeholder, you can enhance the user experience and align it with your overall design. Here's an example:

input::placeholder {  
  color: #999;  
  font-style: italic;  
}

In the above code, the placeholder text in input fields will be displayed in red color with an italic font style.

![](https://miro.medium.com/v2/resize:fit:423/1*GYZOoTFg8A8zg1UpCp_KKQ.png)

# 6. The `::cue` Pseudo-Element

The `::cue` pseudo-element targets the cue text of an `<audio>` or `<video>` element. Cue text is typically used for captions or subtitles in multimedia content. With this pseudo-element, you can apply styles specifically to the cue text. Here's an example:

video::cue {  
  color: white;  
  background-color: black;  
}

In the above code, the cue text in a video element will have white text color and a black background.

![](https://miro.medium.com/v2/resize:fit:700/1*pME1DeGOrxDcl0Cs1Wd53w.png)

Image from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::cue)

# 7. The `::grammar-error` and `::spelling-error` Pseudo-Elements

The `::grammar-error` and `::spelling-error` pseudo-elements allow you to style portions of text marked as grammar or spelling errors, respectively. These pseudo-elements are useful for providing visual cues to users when there are errors in the content. Here's an example:

::grammar-error {  
  text-decoration: line-through;  
  color: red;  
}  
  
::spelling-error {  
  text-decoration: underline;  
  color: blue;  
}

![](https://miro.medium.com/v2/resize:fit:563/1*-FvqP1TU1LVCKSdp17bZVw.png)

# 8. The `::backdrop` Pseudo-Element

The `::backdrop` pseudo-element is used in conjunction with the Fullscreen API to customize the backdrop behind an element in full-screen mode. It allows you to change the default black backdrop to a custom color or style. Here's an example:

video::backdrop {  
  background-color: gray;  
}

In the above code, when a video element is in full-screen mode, the backdrop behind it will have a gray background color.

![](https://miro.medium.com/v2/resize:fit:700/1*Jz1S0jXVdbaHOwjjQ5KPJA.png)

# 9. The `::target-text` Pseudo-Element

The `::target-text` CSS pseudo-element represents the text that has been scrolled to if the browser supports text fragments. It allows authors to choose how to highlight that section of text. Here's an example:

::target-text {  
  background-color: rebeccapurple;  
  color: white;  
}

Here is an [online example](https://mdn.github.io/css-examples/target-text/index.html#:~:text=From%20the%20foregoing%20remarks%20we%20may%20gather%20an%20idea%20of%20the%20importance) provided by MDN. Note that this API is [currently experimental](https://caniuse.com/mdn-css_selectors_target-text).

![](https://miro.medium.com/v2/resize:fit:700/1*416jfJSVElwXwTx_r_GlUg.png)#css