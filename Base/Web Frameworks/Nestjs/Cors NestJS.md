#cors #nestjs
https://stackoverflow.com/questions/50949231/nestjs-enable-cors-in-production

Try to use an approach described in here [https://docs.nestjs.com/techniques/security#cors](https://docs.nestjs.com/techniques/security#cors)

```javascript
const app = await NestFactory.create(ApplicationModule);
app.enableCors();
await app.listen(3000);
```

If you are running NestJs with graphql you will run into a problem where Apollo server will override the CORS setting [see link](https://github.com/expressjs/cors/issues/134#issuecomment-413543241). This below fixed the problem. I wasted 8 hrs of my life on this. :-( I hope you see this and you don't do that. see [link](https://github.com/apollographql/apollo-server/issues/1142#issuecomment-486657060) and [link](https://github.com/nestjs/nest/issues/1579)

```javascript
        GraphQLModule.forRoot({
            debug: process.env.NODE_ENV !== 'production',
            playground: process.env.NODE_ENV !== 'production',
            typePaths: ['./**/*.graphql'],
            installSubscriptionHandlers: true,
            context: ({req}) => {
                return {req};
            },
            cors: {
                credentials: true,
                origin: true,
            },
        }),
```

then in your main.ts:

```javascript
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
```

The documentation for the cors config object is here: [https://github.com/expressjs/cors#configuration-options](https://github.com/expressjs/cors#configuration-options)

I noticed nobody used an array for the origin, so in case anyone wanted some quick copy pasta

And in case you were wondering, I researched it too... http and https is considered different and so are subdomains or lack thereof ([www.example.com](http://www.example.com/) and app.example.com).

```javascript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://example.com',
    'http://www.example.com',
    'http://app.example.com',
    'https://example.com',
    'https://www.example.com',
    'https://app.example.com',
  ],
  methods: ["GET", "POST"],
  credentials: true,
});
```

I was able to get it working by giving my own origin function. The complete enableCors function would be like for NestJS or any NodeJS server like:

```javascript
var whitelist = ['https://website.com', 'https://www.website.com'];
app.enableCors({
origin: function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1) {
    console.log("allowed cors for:", origin)
    callback(null, true)
  } else {
    console.log("blocked cors for:", origin)
    callback(new Error('Not allowed by CORS'))
  }
},
allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
credentials: true,
});
```

and the appOptions if you are using NestJS Express:

```javascript
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

Sad to know that you also tried:

```javascript
const app = await NestFactory.create(ApplicationModule);
app.enableCors();
await app.listen(3000);
```

And it's still not working.

---
#cors #headers #allow-origin
Ensure that on your server side you have [cors](https://enable-cors.org/) enabled, which should be something like this:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
```

And also ensure that your browser is [cors](https://enable-cors.org/client.html) supported. If all these still doesn't work, I will advice you download [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) extension for Chrome, it should fix your issue.

