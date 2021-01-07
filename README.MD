### Info

This webpack setup should be used when you are working on an existing Shopify theme.

It includes autoprefixer and babel-loader for ES6 basic support. 

### Requirements

* nodejs
* npm
* themekit

### Usage

```
npm run start
npm run start:dev
```

These command will run the theme download command and commit it before proceeding.

---

```
npm run start:env
npm run start:dev:env
```

These command are similar to the previous step, but they will use the `custom_config.yml` created from the `npm run env:dev/npm run env:prod` command detailed below.

---

```
npm run dev
```

The dev command is faster but it will not minify the output.

```
npm run prod
```

The prod command is slower but it will remove comments and minify the output.

---

#### Selecting ENV

```
npm run env:dev
```

Run with select option for the the enviorment and webpack under development mode.

This will generate a new `custom_config.yml` file and use that instead of the standard `config.yml` file. (the env will be called `development` no matter what you choose)

```
npm run env:prod
```

Run with select options for the enviorment and webpack under production mode.

This will generate a new `custom_config.yml` file and use that instead of the standard `config.yml` file. (the env will be called `development` no matter what you choose)

---

#### Using the ENV from previous steps

```
npm run dev:env
```

Use the genenerated `custom_config.yml` file skipping the radio options and start webpack development mode.

```
npm run prod:env
```

Use the genenerated `custom_config.yml` file skipping the radio options and start webpack production mode.

### Forcing themekit to work on live theme

```
start:live
start:dev:live
```

These commands will add the `--allow-live` flag to the themekit and allow to watch the live theme.

There are separate commands for the env as well:

```
start:env:live
start:dev:env:live
```


### Deploy

```
deploy
deploy:live
deploy:env
deploy:env:live
deploy:dev
deploy:dev:env
deploy:dev:live
deploy:dev:env:live
```
