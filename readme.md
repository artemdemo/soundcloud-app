# Soundcloud app

In browser music app that uses sundcloud open API

## Important - API KEY (CLIENT ID)

You need to get your own API KEY (CLIENT ID). This app wouldn't work without one.

After yo have your API KEY (CLIENT ID) you need to save it in file `soundcloud-key.json`:

Format should be as following:
```json
{
    "CLIENT_ID": "your_id_string"
}
```

## Getting started

Install all modules and dependencies

```
$ npm i
```

Compile client app for production:

```
$ npm run build
```

Compile client app for development:

```
$ npm run dev
```

In development use `watch` command

```
$ npm run watch
```


![alt tag](https://github.com/artemdemo/soundcloud-app/blob/master/soundcloud-app.png)
