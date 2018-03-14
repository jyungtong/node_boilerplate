# Node Microservices Boilerplate
> This is my own opinionated boilerplate which heavily using through out my work. 

## App Structure
### Docker
The boilerplate build on top of the concept of docker. So that it is easier to be use in containerized environment.

### Repository Registry
The CI/CD [Scripts](/scripts) are based on private AWS ECR. We are using AWS ECR to host our private application.

## Usage
Most of the build environment variable can be changed through the [Jenkinsfile](/Jenkinsfile).

You can also refer to the ENV in [Dockerfile](/Dockerfile) for app runtime environment.
