@ echo off

rem backup app.js

copy /y webpack-config/base/url.config.js deploy/url.config.bak.js

rem copy deploy url.config.deploy.js
copy /y deploy/url.config.deploy.js webpack-config/base/url.config.js

rem do package
cmd /C "npm run build"

rem do recovery
move /y deploy/url.config.bak.js webpack-config/base/url.config.js

echo all done
pause
