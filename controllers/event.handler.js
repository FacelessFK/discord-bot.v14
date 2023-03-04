const routeDir = require("../utl/path.route");
const path = require("path");
const fs = require("fs");

//
function loadEvents(client) {
    // Grab all the event files from the events directory
    const eventsPath = path.join(routeDir, "models", "events");
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js"));
    // Grab all events and execute them
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else if (event.on) {
            client.on(event.name, (...args) => event.execute(...args));
        } else {
            console.error("the event cant execute!");
        }
    }
}
module.exports = {
    loadEvents,
};
