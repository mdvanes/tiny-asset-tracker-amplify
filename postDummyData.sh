#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

APPSYNC_PREFIX="j"
AUTH_KEY="eyJ"

function put () {
    # curl -X POST http://localhost:3000/api/lora \
    # -H 'Content-Type: application/json' -H 'Origin: http://example.com' \
    # -d "[{ \"bn\": \"urn:dev:DVNUUID:???:\", \"bt\": 111111111111},{ \"n\": \"battery\", \"u\": \"%\", \"vs\": $3},{ \"n\": \"accelerationX\", \"u\": \"m/s2\", \"v\": 0},{ \"n\": \"latitude\", \"u\": \"lat\", \"v\": $1},{ \"n\": \"longitude\", \"u\": \"lon\", \"v\": $2},{ \"n\": \"locTime\", \"vs\": \"1\"}, { \"n\": \"temperature\", \"v\": $4, \"u\": \"Cel\"} ]"

    curl "https://$APPSYNC_PREFIX.appsync-api.eu-west-1.amazonaws.com/graphql" \
    -H "authorization: $AUTH_KEY" \
    --data-raw "{\"query\":\"mutation CreateLora(\$input: CreateLoraInput\\u0021, \$condition: ModelLoraConditionInput) {\\n  createLora(input: \$input, condition: \$condition) {\\n    id\\n    time\\n    lat\\n    long\\n    temp\\n    createdAt\\n    updatedAt\\n    owner\\n  }\\n}\\n\",\"variables\":{\"input\":{\"time\":\"21:05:42\",\"lat\":$1,\"long\":$2,\"temp\":$4}}}"
}

# curl http://localhost:3000/api/coords

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