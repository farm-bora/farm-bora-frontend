#!/bin/sh
rm -rf .next
npm run build && cp -r public .next/standalone/public