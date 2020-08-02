# Node JWT MySQL

An app in Node with JWT and MySQL, it follows tutorial created on [BezKoder](https://bezkoder.com/node-js-jwt-authentication-mysql/#Token_Based_Authentication)

## Install

To install the app, run:

```bash
git clone https://github.com/mbougarne/node-jwt-mysql.git
npm install
cp ./env.example ./.env
```

Then go to ```.env``` and update it with your credentials, after that run this command to migrate database:

```bash
npm run migrate
```

You can run the app then using ```npm start```

### Thanks

Thanks to  [BezKoder](https://bezkoder.com)
