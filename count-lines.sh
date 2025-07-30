#!/bin/bash

client_lines=$(find client/src -type f \( -name '*.ts' -o -name '*.tsx' \) | xargs wc -l | tail -1 | awk '{print $1}')
server_lines=$(find server/src -type f \( -name '*.ts' -o -name '*.tsx' \) | xargs wc -l | tail -1 | awk '{print $1}')

echo "client: $client_lines, server: $server_lines" 