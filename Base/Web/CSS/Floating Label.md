![[Pasted image 20221201052553.png]]```
<div class="form-field">
<input type="text" id="name" placeholder=" "/>
<label for="name">Name</label>
</div>

<div class="form-field">
<input type="text" id="email" placeholder=" "/>
<label for="name">E-Mail</label>
</div>
<div class="note">
  I wanted to do this using 
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:blank" target="_blank">:blank</a>, but it is not supported yet, and <a href="https://codepen.io/ghaste/pen/GRxKwKg" target="_blank">the pen I created for it</a> is broken as the polyfill I was using for it, is broken as well.
</div>
```

```
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,500&display=swap');

*, *:after, *:before {
    box-sizing: border-box;
}
:root {
    font-family: 'Poppins', sans-serif;
  /* font sizes will be relative to this */
    font-size: 2rem;
    font-weight: 200;
}
body {
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 1.5rem;
    place-content: center;
    min-height: 100vh;
    border: 10px solid;
    background-color: #F3D060;
}

input[type="text"]:focus {
  outline: .3rem inset #0003;
  outline-offset: 0.25rem;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    font-size: 1.2rem;
    mix-blend-mode: color-burn;
}
input[type="text"] {
  position: relative;
  font-wight: 100;
  font-size: 1.2rem;
  border: 0;
  background-color: transparent;
}
.form-field {
  position: relative;
  display: inline-block;
  border: 1px solid #0003;
  border-radius: 0.3em;
  padding: 0.3rem;
  background-color: inherit;
  transition: 200ms ease;
}
.form-field > input[type="text"]:placeholder-shown + label {
  font-size: 1.2rem;
  top: 50%;
  font-weight: 500;
  background: transparent;
  color: #1F2020B0;
}
input::placeholder {
  color: transparent;
}
.form-field > label,
.form-field > input[type="text"] + label, 
.form-field > input[type="text"]:focus + label,
.form-field > input[type="text"]:active + label,
.form-field > input[type="text"]:not(:placeholder-shown) + label {
  font-size: 0.8rem;
  position: absolute;
  left: 0%;
  transform: translate(0, -50%);
  font-weight: 100;
  line-height: 0.5;
  padding: 0;
  top: -0.1rem;
  background-color: inherit;
  margin-inline: 0.25rem;
  padding-inline: 0.2rem;
  pointer-events: none;
  transition: 100ms ease;
  color: #1F2020A0;
}


.note {
  position: fixed;
  top: 75vh;
  right: 0;
  width: min(40ch, 70vw);
  transform: translateY(-50%);
  border: 1px solid #f9f6efc0;
  box-shadow: 2px 2px 0 1px #53515090, 4px 4px 0 1px #53515090,
    6px 6px 0 1px #53515090, 8px 8px 0 1px #53515090, 10px 10px 0 1px #53515090;
  padding: 1rem;
  margin: 1rem;
  background-image: linear-gradient(to bottom right, #ebebe3a0, #f9f6efa0);
  /*radial-gradient(ellipse at top left, #fff3, #fff1);*/
  z-index: 100;
  backdrop-filter: blur(2px);
  line-height: 1.7;
  font-size: 14px;/* forcing the font size */
}

.note a {
  color: crimson;
  text-decoration: none;
  font-style: italic;
  font-weight: bold;
}
```