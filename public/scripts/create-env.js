const fs = require('fs')
fs.writeFileSync('./.env', `MODEL2_KEY=${process.env.MODEL2_KEY}\n`)