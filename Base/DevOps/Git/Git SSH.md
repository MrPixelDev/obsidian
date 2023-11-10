#git #ssh 

## Step 1: Create Access Token on GitHub

First of all, you must create a personal Access Token on GitHub. To do so follow the steps below:

-   Click on your **GitHub profile icon** on the top right corner
-   Click **Settings**
-   From the menu shown on the left, click **Developer Settings**
-   Click **Personal access tokens**
-   Click **Generate new token**
-   Add a note that will help you identify the scope of the access token to be generated
-   **Choose the Expiration period** from the drop down menu (Ideally you should avoid choosing the No Expiration option)
-   Finally, **select the scopes you want to grant the corresponding access to the generated access token**. Make sure to select the minimum required scopes otherwise you will still have troubles performing certain Git Operations.
-   Finally click **Generate Token**

By now, you should have generated your personal access token successfully and the following message should be visible on your screen.

![](https://miro.medium.com/v2/resize:fit:700/1*pNBFbuXZlsaUkWRkkLr7Aw.png)

Source: [Author](https://gmyrianthous.medium.com/)

Underneath that message, you should also be able to see your personal access token. **Make sure to copy it** as we will need it in the following step(s).

## Step 2: Change the remote URL

Now that we have created our personal access token, we need to run the following command:

git remote set-url origin https://**<githubtoken>**@github.com/**<username>**/**<repositoryname>**.git

In the above command make sure to replace:

-   `<githubtoken>` with the personal access token you have copied in the previous step
-   `<username>` with your GitHub username
-   `<repositoryname>` with the name of your GitHub repository

## Step 3: Test that it works

Now we have successfully configured token-based authentication for a specific repository on GitHub. To test that everything went to plan, simply try to push the changes you’ve made locally to the remote host. For example,

$ git push -u origin main

and the Git operation should be executed with no issues.
git remote set-url origin https://u-n:token@github.com/u-n/repo.git

git remote add origin https://u-n:token@github.com/u-n/repo.git