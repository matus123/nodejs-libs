# potrebne
- docker
- node v8+
- yarn

# instalacia
- `yarn`

# prvotny setup prostredia
- `docker-compose up -d` (nastartuje potrebne docker kontajner)
- `yarn run db:migrate:run` (nastavi db na najnovsiu verziu)
- `yarn dev:setup` (nastavi docker komponenty)
- `yarn dev:setup-data` (nahra dump data do databazy)

# spustenie (pre frontend je potrebne spustit obe)
- `yarn run hot:server:dev`
- `yarn run hot:client:dev`

# spustenie storybook
- `yarn run storybook`

# pristup
- backend bezi na `http://localhost:5000` 
- frontend bezi na `http://localhost:5000`
- storybook bezi na `http://localhost:6006`

# vscode 
## settings
```json
{
  "eslint.autoFixOnSave": true,
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ],
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "[typescriptreact]": {
    "editor.formatOnSave": false
  },
  "editor.tabSize": 2
}
```
## debug
```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "args": [
        "-r",
        "ts-node/register",
        "src/app.ts"
      ],
      "cwd": "${workspaceRoot}/src/server",
      "protocol": "inspector",
      "runtimeArgs": [],
      "outputCapture": "std"
    },
    {
      "name": "Debug Integration Tests",
      "type": "node",
      "request": "launch",
      "args": [
        "node_modules/.bin/jest",
        "-c",
        "jest-integration.js"
      ],
      "cwd": "${workspaceRoot}/src/server",
      "protocol": "inspector",
      "runtimeArgs": [],
      "outputCapture": "std"
      // "console": "integratedTerminal",
      // "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

