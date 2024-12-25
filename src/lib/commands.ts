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
        name: "shutdown",
        command: "shutdown /s /t 60"
    }, {
        name: "echo",
        command: "echo hello world"
    }, {
        name: "curl",
        command: "curl -I https://example.com"
    }]
}];

export default remotesData;
