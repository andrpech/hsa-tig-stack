const StatsD = require('hot-shots');
const client = new StatsD({ host: 'localhost', port: 8125, prefix: 'performance' });

const starWarsEvents = [
    'lightsaber-duel',
    'pod-race',
    'death-star-attack',
    'endor-battle',
    'cantina-meeting'
];

setInterval(() => {
    const event = starWarsEvents[Math.floor(Math.random() * starWarsEvents.length)];
    const delta = Math.floor(Math.random() * 5) + 1;
    const time = Math.floor(Math.random() * 300) + 100;

    client.increment(`request.successful.count,type=${event}`, delta);
    client.timing(`request.successful.time,type=${event}`, time);

    console.log(`Sent metrics for event: ${event}, count: ${delta}, time: ${time}ms`);
}, Math.floor(Math.random() * 50) + 5);
