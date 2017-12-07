// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCniCc0yo3PxOMy6bV-lEEix11oVuO9bWc",
    authDomain: "twitter-clientpanel.firebaseapp.com",
    databaseURL: "https://twitter-clientpanel.firebaseio.com",
    projectId: "twitter-clientpanel",
    storageBucket: "twitter-clientpanel.appspot.com",
    messagingSenderId: "852149559072"
  }
};
