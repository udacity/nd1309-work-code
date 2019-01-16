# npm-postinstall
Lightweight npm postinstall message to invite people to donate to your collective

## Installation

```
npm install --save opencollective-postinstall
```

And in your `package.json` add: 

```json
{
  ...
  "scripts": {
    "postinstall": "opencollective-postinstall"
  },
  "collective": {
    "url": "https://opencollective.com/webpack"
  }
  ...
}
```

Note: This is a lightweight alternative to the [opencollective-cli](https://github.com/opencollective/opencollective-cli) that offers a more complete postinstall message with the current balance and ASCII logo of the collective.