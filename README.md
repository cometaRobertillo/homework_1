## Pirple homework 1

> Basic nodejs no dependencies API

# Usage

Run with Windows powershell

```

**for local environment**
$env:NODE_ENV="staging"

**for production environment**
$env:NODE_ENV="production"

node index.js

```
__Remember to reset env to switch local or production__

Run with windows CMD

```

**for local environment**
set NODE_ENV=staging&&node index.js

**for production environment**
set NODE_ENV=production&&node index.js

```

Mac & linux (GNU)

````

**for local environment**
NODE_ENV=staging node index.js

**for production environment**
NODE_ENV=production node index.js

````

to switch http & https protocol you need
pass arguments, http is set default value

````

node index.js https

````

## RGR