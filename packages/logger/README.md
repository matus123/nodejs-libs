# Instalation
    - `npm install @ai-maps/backend-logger`

# Usage example
```javascript
import { LoggerInstance, LoggerManager } from '@ai-maps/backend-logger';
const loggerInstance = new LoggerInstance(
    {
        destination: pino.extreme(),
    },
    {
        environment: 'test',
        project: 'test',
        version: 'test',
    },
);

const loggerManager = new LoggerManager({
    loggerInstances: [loggerInstance],
});
```

# Vscode settings.json
```json
{
    "editor.formatOnSave": true,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ]
}
```


# Commit message build triggers
| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

