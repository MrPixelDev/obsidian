#Cors #Theory

# Become a CORS Wizard 🧙‍♀️

## Do CORS errors have you in a headlock? Learn about what they are & different ways to nuke them. 💣

[![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%27200%27/%3e)![Fatima Mohamed's photo](https://cdn.hashnode.com/res/hashnode/image/upload/v1662515533466/Xv4Ub0NlR.jpeg?w=200&h=200&fit=crop&crop=faces&auto=compress,format&format=webp)](https://hashnode.com/@fatimamo)

[Fatima Mohamed](https://hashnode.com/@fatimamo)

·[Oct 26, 2022](https://fatimamo.com/become-a-cors-wizard)·

8 min read

Featured on Hashnode

### TABLE OF CONTENTS

-   [CORS Terminology](https://fatimamo.com/become-a-cors-wizard#heading-cors-terminology)
-   [What is CORS?](https://fatimamo.com/become-a-cors-wizard#heading-what-is-cors)
-   [How does CORS work?](https://fatimamo.com/become-a-cors-wizard#heading-how-does-cors-work)
-   [Why are you getting a CORS error? 🙄](https://fatimamo.com/become-a-cors-wizard#heading-why-are-you-getting-a-cors-error)
-   [Few ways to resolve CORS errors](https://fatimamo.com/become-a-cors-wizard#heading-few-ways-to-resolve-cors-errors)
-   [Wrapping Up](https://fatimamo.com/become-a-cors-wizard#heading-wrapping-up)
-   [Want to go Down the Rabbit Hole?](https://fatimamo.com/become-a-cors-wizard#heading-want-to-go-down-the-rabbit-hole)
-   [Shoutouts](https://fatimamo.com/become-a-cors-wizard#heading-shoutouts)

**_It finally happened._** 😲 You've been working hard implementing your frontend web app, but the moment you try to request a resource from a different server to display in your app, you get the dreaded CORS error. Never fear! We'll put it in its place by going through what CORS is, why you keep getting CORS errors and a few ways you can resolve them.

### CORS Terminology

Before we jump into it, let's go over a few important terms.

-   **Origin** is a **_url_** that is made up of three parts:
    -   **URI scheme**, for example http:// or https://
    -   **Hostname** like [twitter.com](http://www.twitter.com/)
    -   **Port number**, like 80 for HTTP and 443 for HTTPS. You don't ever see them included in your address bar, because that's taken care of for us behind the scene, but try pasting `https://twitter.com:443` into your address bar and notice how it automatically navigates you to the expected website.
-   **HTTP Requests** _are requests that a web app makes to access resources from an application._ There are a few different types of HTTP requests, including GET (which lets you get resources), DELETE (which lets you delete resources) and so on. An example of a GET request can be seen below, when you use twitter in your browser to click on someone's profile, and you want to see their tweets. The web app sends an HTTP request to the server at `http://twitter-api.com` that responds with the tweets for that person so you can view them.![Diagram of a sample HTTP Get Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1666753233263/qggiPXYKH.png?auto=compress,format&format=webp)
-   **Cross-Origin Request** when a request is made from one origin to a different origin. Example? You look up _cat images_ on `https://flikr.com` and that app hits up `https://image.com/api` to request cat photos to display for you.![Diagram of a Sample Cross Origin Request](https://cdn.hashnode.com/res/hashnode/image/upload/v1666753827447/Ah3K4EEWW.png?auto=compress,format&format=webp)
-   **HTTP Headers** _are data that describe the request or response being sent. They basically provide additional information about it, kinda like how you have a bio on your Twitter profile._ Examples of headers like `Host` and `access-control-allow-origin` are seen in the image below.![Diagram of an HTTP response with headers](https://cdn.hashnode.com/res/hashnode/image/upload/v1666753299656/T2e6UkWTE.png?auto=compress,format&format=webp)
-   A **Proxy** is a server that acts as a middle man between a client (your browser) and another server.

### What is CORS?

[**CORS**](https://medium.com/@electra_chong/what-is-cors-what-is-it-used-for-308cafa4df1a) (Cross Origin Resource Sharing) is a set of rules that all browsers implement to help secure web apps from unwanted access. (+1 for security 🥳) One of the ways browsers do this is by checking for specific information in an HTTP response that let it know that the web app asking for a resource has been granted permission to do so. This is the default behavior of the browser unless it already knows that a web app has access to a resource.![Meme of spongebob checking response headers](https://cdn.hashnode.com/res/hashnode/image/upload/v1666577217219/oVrab04kt.jpg?auto=compress,format&format=webp)

### How does CORS work?

At a high-level, depending on the type of request being made, CORS works in one of two ways. Let's consider both from the context of getting vs editing a tweet (yeah, [that's a thing now](https://blog.twitter.com/en_us/topics/product/2022/twitter-new-edit-tweet-feature-only-test)).

1.  **_When your web app wants to GET a tweet WITHOUT making changes to it_** the browser checks that the response contains a `access-control-allow-origin` header that is set to the origin of the requesting twitter app (for example, `https://twitter.com`, or a `*` to tell the browser that all origins on the web have access to it. This is the typical behavior for GET requests.
    
2.  **_When your web app wants to UPDATE a tweet_**, a few different things happen.
    
    -   The browser sends a **pre-flight request**, which is a small request of type OPTIONS, that gives the server some data about the request you're attempting to send to update your tweet. The backend app reviews the headers provided in the **pre-flight request** to determine if the request you want to make is even allowed. Some of the headers that are added to the **pre-flight request** are [Access-Control-Request-Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method) and [Access-Control-Request-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers). These give the server information like what is the request method, etc. This added layer of protection is a thing because requests that can make changes to resources are more likely to have damaging effects than requests that don't.
    -   Once the server receives the pre-flight request, it responds and lets you know if it has accepted a request under the settings you've given it through the headers. Check out the conversation between the browser and backend server below for a simplified explanation.![Conversation between browser and server, but make them both toddlers](https://cdn.hashnode.com/res/hashnode/image/upload/v1666772758378/xVPfKzFuc.png?auto=compress,format&format=webp)

### Why are you getting a CORS error? 🙄

One of the top reasons for CORS errors in development is that the server you are sending a request to might not include the expected `access-control-allow-origin` header in responses it sends back to you. Or if it does, it doesn't include your frontend app's URL in the list of approved origins. The solutions below will aim to remedy this. You can find a lengthy list of other causes for CORS errors [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors).

### Few ways to resolve CORS errors

1.  **Enable CORS on the backend** What does this look like? Enabling CORS and adding your front-end app's origin to the list of approved origins for the API.
    -   **Benefit**: You can internally fix the issue with usually a few lines of code.
    -   **Drawback**: Requires you to make updates to the backend, which you may or may not have access to do.
    -   **Example**: This is how I did it for a recent project I was working on using the Phoenix elixir framework for my backend. First I found a CORS library called `Corsica` that would add my front-end's origin to the list of approved origins. Then I added it as a dependency (a dependency is third party code that your code requires to run) to my backend project. In elixir, you add a new dependency in your `mix.exs` file as shown below.
        
        COPY
        
        COPY
        
        COPY
        
        COPY
        
        COPY
        
        ```
        defp deps do
        [
        ...
        {:corsica, "~> 1.1.3"}
        ]
        end
        ```
        
        Then, I added my front-end web apps origin to the list of approved origins by adding the Corsica plug, and setting my frontend's origin in the list of origins approved to access resources from my backend.
        
        COPY
        
        COPY
        
        COPY
        
        COPY
        
        COPY
        
        ```
        plug Corsica, origins: ["http://localhost:3000"]
        ```
        
        For the sake of this blog post, I've hardcoded the link to my local front-end app, but depending on which backend framework you choose, you can programmatically set the origin URL based on the environment you are in. You will follow a similar approach of enabling CORS on the backend in many backend frameworks.
2.  **Send your requests to a proxy that adds the expected headers** to the response. The code for this will live in your front end app. What exactly does this mean though? Instead of your app sending requests to `https://twitter.com/`, you can use a CORS proxy like [CORS anywhere](https://github.com/Rob--W/cors-Anywhere) which is located at `https://cors-anywhere.herokuapp.com/` like this -> `https://cors-anywhere.herokuapp.com/https://twitter.com`.
    
    -   **Benefit**: You no longer get the CORS error, and now have access to the resources you were requesting because the expected header was added by the CORS proxy.
    -   **Drawback**: The request may potentially take longer to fulfill since you will be at the mercy of how fast the external proxy takes to send, receive and update the response to include the header CORS needs to be happy. Additionally, you have to 100% trust the proxy, because it can read and do anything with the response your expecting back. I would highly discourage using one for anything other than trivial data.![Proxy.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1666753400946/Gn6dFPKHj.png?auto=compress,format&format=webp)
3.  **Send your requests to your own proxy** to reduce the potential slowness that might happen when waiting for an external proxy to add headers for you.
    
    -   **Benefit**: You don't need to make any changes to the back-end. You can allocate as many resources as you'd like to your proxy to reduce slowness.
    -   **Drawback**: You'll have to manage the resources for your proxy, but chances are if your hosting a backend app this might not be that big of a drawback. You can view an example of how to do this [here](https://minasami.com/2021/06/10/cors-errors-fix-with-reactjs.html).
4.  **Temporarily disable CORS on your browser**
    -   **Benefit**: You can develop and test making requests from your browser to cross-origins immediately.
    -   **Drawback**: This should only be used temporarily and only works in development. The CORS error will still exist when you deploy your application to production.

Depending on the browser you are using, you can either install an extension to bypass CORS, OR if you're using Safari (judge me, idc, a girl's gotta do what a girl's gotta do), you can manually disable CORS temporarily by enabling the developer menu and clicking on the option below:![Screen Shot 2022-10-24 at 8.54.26 PM.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1666662869152/Kppb9yDRw.jpg?auto=compress,format&format=webp)

### Wrapping Up

Long story short, CORS is a set of rules that every browser has universally implemented to keep a web app and its users secure. And as most things in the world of development go, there are several methods of fixing any potential CORS error that may arise. I know they can be a headache to deal with, but now you know what they are and a few ways you can resolve them, **you got this**!

Now go, give those CORS errors a run for their money! 💪

![goku-jumping-goku.gif](https://cdn.hashnode.com/res/hashnode/image/upload/v1666663055388/0vdezSCDh.gif?auto=format,compress&gif-q=60&format=webm)

### Want to go Down the Rabbit Hole?

Here are some additional readings you can do:

-   [What are CORS proxies, and When are they Safe?](https://httptoolkit.com/blog/cors-proxies/)
-   [CORS Anywhere Proxy](https://github.com/Rob--W/cors-anywhere)
-   [Stealing Sensitive Data with a CORS Attack](https://www.whiteoaksecurity.com/blog/fun-with-cors/)