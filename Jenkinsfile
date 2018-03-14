#!groovy

pipeline {
    agent any

    options { buildDiscarder(logRotator(numToKeepStr: '5')) }

    environment {
        APP_NAME='YOUR_APP_NAME'
        PRIVATE_REGISTRY='some-private-registry.com'
        GIT_VERSION=sh(script: 'git describe --abbrev=0 --tags || echo "v0.0.0"', returnStdout: true)
        VERSION=sh(script: "[ \"$BRANCH_NAME\" == \"master\" ] && echo \"latest\" || echo $GIT_VERSION", returnStdout: true)
        ENV_FILE = credentials('.env')
        DEPLOY_URL = 'ssh.your-server.com'
    }

    stages {
        stage('Test') {
            steps {
                slackSend color: "good", message: "Build Started - ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
                sh '''#!/bin/bash -l
                cp $ENV_FILE .env
                yarn
                yarn test
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash -l
                ./scripts/build.sh
                '''
            }
        }
        stage('Deploy Development') {
            when {
                branch 'master'
            }
            steps {
                sh '''#!/bin/bash -l
                ./scripts/deploy.sh
                '''
            }
        }
        stage('Deploy Production') {
            when {
                branch 'production'
            }
            steps {
                sh '''#!/bin/bash -l
                APP_NAME=$APP_NAME PRIVATE_REGISTRY=$PRIVATE_REGISTRY ./scripts/remote-run.sh
                '''
            }
        }
    }
    post {
        success {
            slackSend color: "good", message: "Build SUCCESS - ${env.JOB_NAME} #${env.BUILD_NUMBER} after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)"
        }
        failure {
            slackSend color: "danger", message: "Build FAILED - ${env.JOB_NAME} #${env.BUILD_NUMBER} after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)"
        }
    }
}
