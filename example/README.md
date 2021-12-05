# How to Use

This is sample for how to use wlapper.
This is sample for lambda using ECR using node runtime.

You can push the Docker Image built here to the ECR and use it from Lambda.
- https://docs.aws.amazon.com/lambda/latest/dg/images-create.html
- https://docs.aws.amazon.com/lambda/latest/dg/configuration-images.html

## Steps

install dependensies

```shell
npm install
```

build docker image

```shell
docker build -t lambda-container-sample .
```

install wlapper

```shell
npm i -g wlapper
```

exec wlapper

```shell
wlapper lambda-container-sample -d '{"body": "Hello world!"}'

# -> { body: 'Hello world!' }
```
