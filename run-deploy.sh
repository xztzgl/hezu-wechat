echo "开始发布 :"

echo "复制 webpack-config/base/url.config.js 到 deploy/url.config.bak.js"

mv -f webpack-config/base/url.config.js deploy/url.config.bak.js

echo "复制 deploy/url.config.deploy.js 到 webpack-config/base/url.config.js"

cp -f deploy/url.config.deploy.js webpack-config/base/url.config.js

echo "编译 project "

npm run build

echo "还原 webpack-config/base/url.config.js"

mv -f deploy/url.config.bak.js webpack-config/base/url.config.js