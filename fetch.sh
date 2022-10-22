#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

set -a
. $DIR/.env
set +a

npx babel-node src/run.js