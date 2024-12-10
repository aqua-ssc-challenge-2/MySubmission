# Aqua SSC Challenge 2
## Description
This server includes 2 base routes:
- **/github-webhook** - that includes has single POST route (`/repository`) for handling the visibility change and
checking if a repo is protected or not, and is yes then it revert the operation.
- **/repository** - that includes a GET and a PUT route (with repo's name), the first one is for fetching the 
repositories information (including: repo's name, is private, and is protected), the second one is for changing whether 
a repo is protected or not

## Project setup

### Install dependencies
```bash
$ npm install
```

### Add `.env` file
#### TL;DR
you need to create .env that contains 3 fields:
- `GITHUB_BOT_USER` - user's name
- `GITHUB_BEARER_TOKEN` - user's token (read below for which permissions)
- `WEBHOOK_SECRET` - to verify that only the webhook has access to the webhook's controller. 

#### In more details
##### User Bot
Have a defined user which you would need to create a token with the following repository permissions:
1. READ access to metadata
2. Read and Write access to administration

- `GITHUB_BOT_USER`: **The Bot's name** (example: `AdirBot`)
- `GITHUB_BEARER_TOKEN`: **The token that has been generated** (example: `github_pat_01ABCD...`)

##### Webhook's Secret
In order to use the webhook in a secured manner you should also a secret that is shared between github
and the server, for the server you just declare it in the .env file, and for the git you put it in the 
`secret` field inside the webhook.

- `WEBHOOK_SECRET`


## Compile and run the project
```bash
# For making the gitHub webhook to send the requests to this server instance
$ ngrok http --url=redbird-vast-surely.ngrok-free.app 3000
```
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
