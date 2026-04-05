const { readdirSync } = require('fs');

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

events.forEach(file => {
    const event = require(`../events/${file}`);
    const eventName = file.split('.')[0];
    console.log(`Loaded event: ${eventName}`);

    client.on(eventName, event.bind(null, client));
});