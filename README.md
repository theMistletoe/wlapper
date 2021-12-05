wlapper
======

this is Lambda container images's local execution wrapper.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/wlapper.svg)](https://npmjs.org/package/wlapper)
[![CircleCI](https://circleci.com/gh/theMistletoe/sample/tree/master.svg?style=shield)](https://circleci.com/gh/theMistletoe/wlapper/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/wlapper.svg)](https://npmjs.org/package/wlapper)
[![License](https://img.shields.io/npm/l/wlapper.svg)](https://github.com/theMistletoe/wlapper/blob/master/package.json)

<!-- toc -->
* [Desciption](#desciption)
* [Usage](#usage)
* [Requirement](#requirement)
# Desciption

AWS Lambda supports execution in container images.
The Dockerfile used and the means to run the implementation locally during development are provided below.
How to exec simulation on Lambda locally is explained on [this](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html).

This tool wraps above process and makes it easy to use as a CLI tool.




<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g wlapper
or
$ npx wlapper

$ wlapper (-v|--version|version)
wlapper/1.0.0 darwin-x64 node-v14.18.1
$ wlapper --help [COMMAND]

USAGE
  $ npx wlapper [docker image name]
...
```

# Requirement

```
npm
docker
```
