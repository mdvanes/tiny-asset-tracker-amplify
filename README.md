# Tiny Asset Tracker for AWS Amplify

## Disclaimer

Note that this sample IoT web application is for testing purposes only and not a secure solution for processing data.

## Description

Map to show tracked lora data for KPN IoT workshop

Uses AWS Amplify DynamoDB data store, so recorded data will be persisted.

Can be deployed to AWS Amplify.

Runs on [Next.JS](https://nextjs.org)

TODO ![screenshot](screenshot.png)

Compare to [tiny-asset-tracker for Azure Web App](https://github.com/kpn-iot/tiny-asset-tracker/).

## Running

1. install: `npm i`
2. build: `npm run build`
3. TODO start server in production mode: `npm start`
4. TODO (optional) seed with dummy data: `./postDummyData.sh`

Forward data from KPN Things to this app, running on localhost:

- KPN Things: set up a flow
- KPN Things: set destination HTTPS endpoint with https://webhook.site
- webhook.site (Tested in Firefox & Chrome, does NOT work in Safari): enable XHR Redirect
  - TODO target: http://localhost:3000/api/lora
  - Content Type: application/json
  - HTTP Method: POST

Deploy on AWS Amplify:

- TODO

## Development

- `npm run dev`

## Steps used to set up this app

- npx create-next-app@latest tiny-asset-tracker-amplify --no-app
- cd tiny-asset-tracker-amplify
- amplify init
- amplify add api
  - REST
  - /lora
  - NodeJS
  - CRUD function for DynamoDB
  - create a new DynamoDB table
    - assetdata
    - lat number
    - long number
    - time string
    - temp number
- amplify push
- amplify status (status on cli) / amplify console / amplify console api (opens web console)
- the Home.module.css is missing in the documentation! Created a dummy one
- go to localhost:3000 and create an account
- curl https://???.execute-api.eu-west-1.amazonaws.com/dev/lora
  - fails with `{ message: "Missing Authentication Token"}`
  - can't find anywhere how to call the generated REST api with the correct token, e.g. `await SSR.API.get("lora", "/lora");`
- amplify add api
  - Graphql
  - single object
  - edit schema
  - amplify push
- clean up test garbage from database
  - amplify console
  - API tab
  - data sources: LoraTable > View
  - Tables: Lora-oq...
  - Expore Items
  - select all items > Actions > delete
- add map ui
  - https://ui.docs.amplify.aws/react/connected-components/geo#quick-start
  - npm install @aws-amplify/ui-react-geo
  - Create map resources by following the Amplify Geo documentation.
  - amplify add geo
    - visualize geospatial data
  - amplify push
  - npm run dev
  - what does this add over directly using mapbox?

# TODO

- Call with curl
- Fix coord randomization
- Delete from current account with CLI
- Remove unused next api routes
- Use monochrome map layer
- Split into smaller components and fix types
- Set up an https endpoint to set as an IoT Things destinations
- Use REST instead of graphql
- Clean up graphql
- Deploy on company account
- Hosting on AWS
