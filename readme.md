npm i telegram@browser

Before working with Telegram’s API, you need to get your own API ID and hash:

Login to your Telegram account with the phone number of the developer account to use. [https://my.telegram.org/].
Click under `API Development tools`.
A `Create new application` window will appear. Fill in your application details. There is no need to enter any URL, and only the first two fields (App title and Short name) can currently be changed later.
Click on `Create application` at the end. Remember that your API hash is secret and Telegram won't let you revoke it. Don’t post it anywhere!

./shared/constant/telegram.local.ts
const API_ID = XXXXXXXXX;
const API_HASH = 'XXXXXXXXXXXXXXXXXXXXXXXXXX';
