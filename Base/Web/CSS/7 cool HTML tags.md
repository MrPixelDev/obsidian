## 1. `meter` & `progress`

The `progress` element is the semantically correct way of displaying progress bars.

The `meter` element is `progress` on steroids. Apart from displaying a **scalar measurement** within a known range, it allows you to specify the value's **low**, **high** & **optimum** range.

```
<meter
  min="0"
  max="100"
  low="25"
  high="75"
  optimum="80"
  value="50"
></meter>
```

![](https://cdn-images-1.medium.com/fit/c/540/284/0*-WypK0Iqc5IugLRH.gif)

## 2. `sup` & `sub`

You can add **superscripts** (like `x²`) with `sup` and **subscripts** (like `x₀`) using `sub` to your document.

![](https://cdn-images-1.medium.com/fit/c/492/368/0*vkaEM7vFQPAgGG8V.png)

![](https://cdn-images-1.medium.com/fit/c/510/337/0*l9mdj1ltZtgs0K-s.png)

## 3. `datalist`

`datalist` allows you to add an autocomplete suggestions to your `input` elements.

![](https://cdn-images-1.medium.com/fit/c/498/372/0*l7eEjaPJqYZOa4-H.png)

## NOTE

1.  The suggestions are NOT LIMITED to text `inputs`, but can be used with **color**, **date**, **time**, and even **range** inputs.
2.  The default styling of the suggestions is **unpleasant to look at**, to say the least. But, you can always style it using **CSS**.

## 4. `map` & `area`

`map` and `area` allow you to create **image maps**, which is a fancy term for **images with clickable areas**.

```
<img
  src="workplace.jpg"
  alt="Workplace"
  usemap="#workmap"
  width="400"
  height="379"
/>
```

```
<map name="workmap">
  <area
    shape="rect"
    coords="34,44,270,350"
    alt="Computer"
    href="computer.html"
  />
  <area
    shape="rect"
    coords="290,172,333,250"
    alt="Phone"
    href="phone.html"
  />
  <area
    shape="circle"
    coords="337,300,44"
    alt="Cup of coffee"
    href="coffee.html"
  />
</map>
```

![](https://cdn-images-1.medium.com/fit/c/500/606/0*W03jeSVKmhvKOykp.gif)

## 4. `details` & `summary`

`details` and `summary` are used to create **collapsible content** without using any **JavaScript**. It's the semantic method of creating **dropdowns**.

![](https://cdn-images-1.medium.com/fit/c/560/346/0*T9r9yUjaWeAuPAPK.png)

## 6. `object`

Pulling your hair out to embed files on your website? Look no further!

`object` allows you to embed a wide range of files like **PDFs**, **images**, **videos**, **audio** and even **Youtube videos**.

![](https://cdn-images-1.medium.com/fit/c/800/351/0*AN18QSS7_IsWP9Jg.png)

## 7. `abbr`

The `abbr` element allows you to add **abbreviations** to your document. When the user hovers over the **abbreviation**, the full form is displayed. Moreover, **screen readers** can also be configured to read out the full form when an **abbreviation** is encountered.

![](https://cdn-images-1.medium.com/fit/c/608/472/0*aWf8cRkXlkBJzUQf.png)