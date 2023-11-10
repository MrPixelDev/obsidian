#puppeteer #JS 

```
import * as puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless:true, defaultViewport: false, useDataDir: './tmp'});

const page = await browser.newPage();
await goto(url, {waitUntil: 'load'}); // opens site

const element = page.$('selector')

await page.evaluate(el => el.querySelector('selector').textContent, element);
await page.evaluate(el => el.innerText, element);

// pagination

const is_disabled = await page.$('.nextButton') !== null;
while (is_disabled) {
	await page.waitForNavigaion() // waits until page navigates to new url or reloads
}


```

## Clustering
```
Clustering
import {Cluster} from 'puppeteer-cluster';

const cluster = await Cluster.launch({
	concurrency: Cluster.CONCURRENCY_BROWSER,
	puppeteerOptions: {
		headless: true,
		defaultViewport: false,
		useDataDir: './tmp'
	}
});

await cluster.task(async ({page, data: url}) => {
	await page.goto(url);
})

cluster.queue('url1');
cluster.queue('url2');


```