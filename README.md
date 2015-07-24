# CordovaFacebook

### Facebook Plugin for Cordova 5.0+

## Supports:

   1 Cordova >= 5.0.0
   2 iOS and Android
   3 Login, Graph Requests, App Events

## Get the Plugin:

   1 `cordova plugin add cordova-plugin-facebook --variable FACEBOOK_DISPLAY_NAME=<Your App Name> --variable FACEBOOK_APP_ID=<Your App's ID> [--save]`

## Using the Plugin:

CordovaFacebook defines a single variable on `window`: `window.CordovaFacebook`.

## Callbacks:

All `CordovaFacebook` methods accept exactly one argument: `options`, of type `Object`.

Passing in a function as `options.onSuccess` or `options.onFailure` will allow you to listen to the result of that method.

Both `onSuccess` and `onFailure` callbacks will generally be passed one argument (whose type may vary) as the result.

## `CordovaFacebook.login`

The `CordovaFacebook.login` method accepts a `permissions` field in addition to the standard callbacks.

`permissions` _(optional)_ - an array of Facebook permissions you are asking for from the user. `"public_profile"` is always requested. See (Facebook's Docs)[https://developers.facebook.com/docs/facebook-login/permissions/v2.4] for more information.

Both `onSuccess` and `onFailure` receive a single `result` object, with the following properties:

`result.error` - `1` if there was an error, `0` otherwise.
`result.success` - `1` if the user accepted the login request, `0` otherwise.
`result.cancelled` - `1` if the user cancelled the login request, `0` otherwise.
`result.errorCode` _(if `error` is 1)_ - Facebook's error code for what went wrong. `0` is a network failure, `304` is a login mismatch (call `logout` before trying again). See (Facebook List of Error Codes)[https://developers.facebook.com/docs/payments/reference/errorcodes].
`result.errorLocalized` _(if `error` is 1)_ - Facebook's localized description of what went wrong, in the current locale.
`result.granted` _(if `success` is 1)_ - An array of the permissions the user approved.
`result.declined` _(if `success` is 1)_ - An array of the permissions the user declined.
`result.accessToken` _(if available)_ - The Facebook Access Token for the User.
`result.userID` _(if available)_ - The Facebook User ID for the User.

Example usage:

```javascript
CordovaFacebook.login({
   permissions: ['email', 'user_likes'],
   onSuccess: function(result) {
      if(result.declined.length > 0) {
         alert("The User declined something!");
      }
      /* ... */
   },
   onFailure: function(result) {
      if(result.cancelled) {
         alert("The user doesn't like my app");
      } else if(result.error) {
         alert("There was an error:" + result.errorLocalized);
      }
   }
});
```

## `CordovaFacebook.logout`

The `CordovaFacebook.logout` method does not have any additional options other than the standard callbacks.

Additionally, the `logout` method will always succeed, and never fail. (Meaning `onFailure` will never be called).

The `onSuccess` callback is not passed any arguments.

Example usage:

```javascript
CordovaFacebook.logout({
   onSuccess: function() {
      alert("The user is now logged out");
   }
});

// Unless you need to wait for the native sdk to do its thing, you dont even really need to use a callback:
CordovaFacebook.logout();
```


