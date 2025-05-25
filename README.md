# Url Shortener

This is a solution to Robex tech tribe Angular cohort Week 3 Challenge. 

## Overview

The main feature of the site is the url shortening service. You input a url and It 
displays a shorter url that points to the same resource as the original url

The site is responsive and also includes
- A button that automatically copies a shortened url when clicked
- Url validation that's inbuilt into the form


Visit the [site](https://url-shortener-robex.vercel.app/) to explore it's full capabilities

### What I learned
I learnt about angular forms, it's various methods, attributes and how it can make managing html form state easier. 
It was also what I used to build the site's form as well as all it's data validation, state management e.t.c
I also learnt how to make http requests with angular's `HttpClient`. The `HttpClient` was used to make the external
requests to the api that was responsible for shortening the links


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10. 
The project was also styled using [SCSS](https://sass-lang.com/)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile the project and store the build artifacts in the `dist/` directory

## Converting to Native Android
The project also uses the capacitor library to generate a native android app with the same features as the website

To generate the android app, first you must build the project using the previously stated instruction.
After you've done that, you can then generate the android app using the command below

```bash
npx cap add android
```

Then, sync the project to install/update the required native dependencies.
```bash
npx cap sync
```

To run a debug build of your capacitor app on an Android device, you can run
```bash
npx cap run android
```

To open your app in android studio or perhaps the `debug build` command above failed, you can run the command below to open your project in [Android Studio](https://developer.android.com/studio). It would also be more effective to build your app in the IDE.
```bash
npx cap open android
```

Capacitor also allows for ios application generation. You can find out more about that in the official [docs](https://capacitorjs.com/docs/basics/workflow)

### Links

- GitHuub URL: [https://github.com/PapaBob31/Week-2-Challenge](https://github.com/PapaBob31/url-shortener-robex)
- Live Site URL: [https://week-2-challenge-iota.vercel.app/](https://url-shortener-robex.vercel.app/)
