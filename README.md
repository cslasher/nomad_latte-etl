## Usage

### JavaScript

#### Installation

`yarn install` or `npm install`

#### Configurations

Set up (or use .env) for the follow environment variables:

```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
MAP_API_KEY
MAP_HOST
```

#### Usage

Use -q to define search terms.
For example, search cafes around 忠孝東路：

```
node Index.js -q 忠孝東路 -t cafe
```
