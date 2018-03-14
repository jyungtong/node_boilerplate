#!/bin/bash

docker service update \
  -d \
  --with-registry-auth \
  --image $PRIVATE_REGISTRY/$APP_NAME:$VERION \
  $APP_NAME
