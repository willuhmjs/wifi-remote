import { API_KEY } from "$env/static/private";

interface Command {
    name: string;
    command: string;
}

interface Remote {
    name: string;
    commands: Command[];
}

const remotesData: Remote[] = [{
    name: "pc",
    commands: [{
        name: "curl",
        command: `curl -X POST http://192.168.1.69:4173/pc/shutdown -H "x-api-key: ${API_KEY}"`
    }]
}];

export default remotesData;
