# Intelligent Trip Planner ✈️

Made by Jasleen Bhatti

Welcome! This is a guide to help you run the Intelligent Trip Planner application on your own computer.

Think of this as the instruction manual. You don't need to be a tech wizard to follow along, just read carefully and follow each step.

## What You'll Need (The Ingredients)

Before we start, you'll need a few things on your computer.

1.  **Visual Studio Code (VS Code):** This is a free program for editing code. It's like Microsoft Word, but for code. You can download it here:
    *   [Download Visual Studio Code](https://code.visualstudio.com/download)

2.  **Node.js:** This is a behind-the-scenes tool that lets your computer run applications like this one. Installing it also gives you a tool called `npm`, which we'll need.
    *   [Download Node.js](https://nodejs.org/en)
    *   When you go to the site, download the version that says **"LTS"** (which stands for Long-Term Support).

3.  **A Google Gemini API Key:** This is like a secret password that lets your app talk to Google's AI. It's free to get one.
    *   Go to [Google AI Studio](https://makersuite.google.com/app/apikey).
    *   Click the **"Create API key"** button.
    *   Copy the long string of letters and numbers it gives you. This is your key! **Keep it secret and safe.**

## Step-by-Step Instructions (The Recipe)

Okay, now that you have all the ingredients, let's get the application running!

### Step 1: Get the Code

First, you need to download all the code files for the project onto your computer.

1.  Find the **"Code"** button on the project page (it's usually a green button).
2.  Click it, and then click **"Download ZIP"**.
3.  A file named something like `project-main.zip` will download. Find this file in your Downloads folder and **unzip it** (on most computers, you can just right-click and choose "Extract All" or "Unzip"). This will create a new folder with all the project files inside.

### Step 2: Open the Project in VS Code

Now, let's open the code in our special editor.

1.  Open the **Visual Studio Code** application.
2.  In the top menu, go to `File` -> `Open Folder...`.
3.  Find and select the folder you just unzipped.

You should now see a list of all the project files on the left side of VS Code.

### Step 3: Add Your Secret API Key

The app needs to know your secret API key to work.

1.  In VS Code, in the file list on the left, right-click on an empty area and choose **"New File"**.
2.  Name this new file exactly: `.env` (the dot at the beginning is very important!).
3.  A new empty file will open. In this file, type the following line:
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
4.  **Important:** Replace `YOUR_API_KEY_HERE` with the actual Gemini API key you copied earlier.
5.  Save the file (`File` -> `Save`).

### Step 4: Install the Helpers (Dependencies)

Now we need to tell VS Code to download all the little helper programs the project needs.

1.  In VS Code's top menu, go to `Terminal` -> `New Terminal`. A little command-line window will appear at the bottom.
2.  Click inside that terminal window and type the following command, then press **Enter**:
    ```bash
    npm install
    ```
3.  You'll see a lot of text scroll by. This is `npm` downloading and installing everything. It might take a minute or two.

### Step 5: Run the App! 🎉

This is the final step!

1.  In the same terminal window at the bottom of VS Code, type this command and press **Enter**:
    ```bash
    npm run dev
    ```
2.  After a moment, you will see a message in the terminal that says `Local:` followed by a web address, something like `http://localhost:5173`.
3.  Hold down the `Ctrl` key (or `Cmd` on a Mac) and click on that link.
4.  Your web browser will open, and you should see the **Intelligent Trip Planner** application running!

You did it! Now you can use the app to plan your next amazing trip.