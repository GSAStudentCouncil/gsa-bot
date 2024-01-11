const manager = require('../modules/DBManager').DBManager;
const app = manager.getInstance({});

app.on("message", (chat, channel) => {
    
});

app.start();
