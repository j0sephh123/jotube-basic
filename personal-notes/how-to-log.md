Event pattern (3-beat, minimal)
- *_start → level:"info".
- *_done → level:"info".
- *_fail → level:"alert" + err.

### Tools
1. [x] Save logs with `pino`
2. [x] Rotate logs with `logrotate`
Absolute path: logrotate wants absolute paths. Convert server/logs/app.log to something like /home/USER/project/server/logs/app.log.
3. [x] Use `Promtail` to 
4. [x] Add logs to `Loki`
5. [x] Visualize with `Grafana`