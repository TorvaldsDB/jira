# README

## eslint, prettier, commitlint

- [install prettier](https://prettier.io/docs/en/install.html)

```shell
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
touch .prettierignore
```

- config eslint

```shell
yarn add eslint-config-prettier -D
```

- install [pre-conmmit-hook](https://prettier.io/docs/en/precommit.html)

```shell
npx mrm@2 lint-staged
```

- config [commitlint](https://github.com/conventional-changelog/commitlint)
