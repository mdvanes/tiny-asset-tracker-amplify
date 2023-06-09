#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

APPSYNC_URL=$(amplify status | grep "GraphQL endpoint" | cut -d " " -f 3)
APPSYNC_API_KEY=$(amplify status | grep "GraphQL API KEY" | cut -d " " -f 4)

function put () {
    # List current items
    curl -X POST -H "Content-Type:application/graphql" -H "x-api-key:$APPSYNC_API_KEY" -d '{ "query": "query { listLoras { items {time} } }" }' "$APPSYNC_URL"
    echo -e "\n\n"

    # curl -X POST http://localhost:3000/api/lora \
    # -H 'Content-Type: application/json' -H 'Origin: http://example.com' \
    # -d "[{ \"bn\": \"urn:dev:DVNUUID:???:\", \"bt\": 111111111111},{ \"n\": \"battery\", \"u\": \"%\", \"vs\": $3},{ \"n\": \"accelerationX\", \"u\": \"m/s2\", \"v\": 0},{ \"n\": \"latitude\", \"u\": \"lat\", \"v\": $1},{ \"n\": \"longitude\", \"u\": \"lon\", \"v\": $2},{ \"n\": \"locTime\", \"vs\": \"1\"}, { \"n\": \"temperature\", \"v\": $4, \"u\": \"Cel\"} ]"

    # TIME=$(date +"%Y%m%d%_H%M%S")

    # APPSYNC_API_KEY works for query but not for mutation, not even in AppSync GraphQL web console!  It gives Unauthorized
    # curl -XPOST -H "Content-Type:application/graphql" -H "x-api-key:$APPSYNC_API_KEY" --data-raw "{\"query\":\"mutation CreateLora(\$input: CreateLoraInput\\u0021, \$condition: ModelLoraConditionInput) {\\n  createLora(input: \$input, condition: \$condition) {\\n    id\\n    time\\n    lat\\n    long\\n    temp\\n    createdAt\\n    updatedAt\\n    owner\\n  }\\n}\\n\",\"variables\":{\"input\":{\"time\":$TIME,\"lat\":$1,\"long\":$2,\"temp\":$4}}}" "$APPSYNC_URL"
}

# curl http://localhost:3000/api/coords
curl -X POST -H "Content-Type:application/graphql" -H "x-api-key:$APPSYNC_API_KEY" -d '{ "query": "query { listLoras { items {time} } }" }' "$APPSYNC_URL"

put "51.9073121" "4.489056" "85.0" "21"

sleep 10

put "52.3993234" "4.8695023" "84.0" "18"

sleep 10

put "53.2105276" "6.5822406" "74.2" "0"

sleep 10

put "51.4587546" "5.3913289" "34.2" "18"

sleep 10

put "52.0577972" "5.1090947" "14.0" "21"

sleep 10