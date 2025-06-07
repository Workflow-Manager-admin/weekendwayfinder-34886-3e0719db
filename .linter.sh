#!/bin/bash
cd /home/kavia/workspace/code-generation/weekendwayfinder-34886-3e0719db/weekendwayfinder
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

