const fs = require("fs");

fs.readFile("env/${apigee.env}/kvms.json", (err, data) => {
    const kvms = JSON.parse(data);
    kvms.forEach( (kvm) => {
        switch (kvm.name) {
            case "${proxy.name.prefix}oauth2-v1-config${proxy.name.suffix}":
                kvm.entry.forEach( (entry) => {
                    switch (entry.name) {
                        case "privateKey":
                            entry.value = fs.readFileSync('env/${apigee.env}/key', {encoding: 'utf8'});
                            break;
                        case "publicKey":
                            entry.value = fs.readFileSync('env/${apigee.env}/key.pub', {encoding: 'utf8'});
                            break;
                    }
                });
                break;
        }
    });
    fs.writeFileSync("env/${apigee.env}/kvms.json", JSON.stringify(kvms, null, 4));
});

