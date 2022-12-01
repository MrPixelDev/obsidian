<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
[Timeline Codepen](https://codepen.io/dhanishgajjar/pen/OJbwEeL)
body {
  background-color: #efefef;
  display: grid;
  place-items: center;
  width: 100%;
}

ul {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  justify-items: center;
  list-style: none;
  margin: 2rem;
  padding: 0;
  position: relative;
  width: 920px;
}

ul:before {
  background-color: dodgerblue;
  content: '';
  height: 100%;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  width: 2px;
}

li {
  background-color: #ffffff;
  border-radius: 9px;
  grid-template-rows: 1fr;
  height: 200px;
  position: relative;
  width: 400px;
}

li:nth-child(odd) {
  justify-self: start;
}

li:nth-child(even) {
  justify-self: end;
}

li:nth-child(odd):before,
li:nth-child(even):before,
li:nth-child(odd):after,
li:nth-child(even):after {
  bottom: 0;
  content: '';
  height: 24px;
  margin: auto;
  position: absolute;
  top: 0;
  width: 24px;
}

li:nth-child(odd):before,
li:nth-child(even):before {
  background-color: #ffffff;
  transform: rotate(45deg);
}

li:nth-child(odd):after,
li:nth-child(even):after {
  background-color: dodgerblue;
  border-radius: 50%; 
}

li:nth-child(odd):after {
  right: -72px;
}

li:nth-child(even):after {
  left: -72px;
}

li:nth-child(odd):before {
  height: 24px;
  right: -12px;
}

li:nth-child(even):before {
  left: -12px;
}

