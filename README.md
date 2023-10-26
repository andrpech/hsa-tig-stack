# Example Docker Compose project for Telegraf, InfluxDB and Grafana

## Services and Ports

### Grafana
- URL: http://localhost:3000 
- User: admin 
- Password: admin 

### Telegraf
- Port: 8125 UDP (StatsD input)

### InfluxDB
- Port: 8086 (HTTP API)
- User: admin 
- Password: admin 
- Database: influx


Run the docker compose:

```bash
$ docker-compose up
```


## Run the siege ti test the architecture

Following command creates 100 threads and loads each thread with 1m requests

```bash
siege -c 100 -t10M http://localhost/app
```

Open grafana dashboard: 
1. follow the link: http://localhost:3000
2. open side menu
3. click on dashboards
4. select `Performance` dashboard and observe the load testing


![Load Testing Example Screenshot](./load-testing-example.png?raw=true "Load Testing Example Screenshot")

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

