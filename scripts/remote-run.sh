#!/bin/bash

DOCKER_AUTH=$(aws ecr get-login --no-include-email --region ap-southeast-1)

ssh root@$DEPLOY_URL "\
  DOCKER_AUTH='$DOCKER_AUTH' \
  VERSION=$VERSION \
  APP_NAME=$APP_NAME \
  bash -s
" < ./scripts/deploy.sh
