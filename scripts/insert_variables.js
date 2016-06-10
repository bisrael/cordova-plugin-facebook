module.exports = function(context) {
  console.log("Inserting variables with before_prepare script!");

  var fs = context.requireCordovaModule('fs');
  var APP_ID = process.env.FACEBOOK_APP_ID;
  var APP_NAME = process.env.FACEBOOK_APP_NAME;
  var METEOR_APP_NAME = process.env.METEOR_APP_NAME;

  function setVariables (path) {
    fs.readFile(path, 'utf8', function (err,data) {
      if (err) { return console.error(err); }

      console.log("path initial: ")
      console.log(data)

      var result =
        data.replace(/{{APP_ID}}/g, APP_ID).replace(/{{APP_NAME}}/g, APP_NAME);

      fs.writeFile(path, result, 'utf8', function (err) {
        if (err) return console.error(err);

        console.log("SUCCESSFULLY WROTE" + path);
        console.log(result);
      });
    });
  }

  console.log("APP_ID: " + APP_ID);
  console.log("APP_NAME: " + APP_NAME);
  console.log("basepath: " + process.cwd());

  setVariables(process.cwd() + '/platforms/android/res/values/strings.xml');
  setVariables(process.cwd() + '/platforms/ios/'+ METEOR_APP_NAME +'/' + METEOR_APP_NAME + '-Info.plist');
}

