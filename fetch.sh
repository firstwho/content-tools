#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

set -a
. $DIR/.env
set +a

node ./node_modules/.bin/get-content