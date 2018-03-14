#!/bin/bash

yarn && yarn build || exit 1

docker build -f Dockerfile -t $APP_NAME . || exit 1

docker tag $APP_NAME $PRIVATE_REGISTRY/$APP_NAME:$VERSION

$(aws ecr get-login --no-include-email --region ap-southeast-1)

docker push $PRIVATE_REGISTRY/$APP_NAME:$VERSION
