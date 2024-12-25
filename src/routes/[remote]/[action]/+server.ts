import { promises as fs } from 'fs';
import { json } from '@sveltejs/kit';
import { exec } from 'child_process';
import { API_KEY } from '$env/static/private';

import remotesData from '$lib/commands.js';


export async function POST({ params, request }) {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== API_KEY) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { remote, action } = params;
    const remoteData = remotesData.find(r => r.name === remote);
    if (!remoteData) {
        return json({ error: 'Remote not found' }, { status: 404 });
    }

    const commandData = remoteData.commands.find(c => c.name === action);
    if (!commandData) {
        return json({ error: 'Action not found' }, { status: 404 });
    }

    try {
        const { stdout, stderr } = await new Promise((resolve, reject) => {
            exec(commandData.command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });
        return json({
            command: commandData.command,
            stdout: stdout.trim(),
            stderr: stderr.trim()
        });
    } catch (error) {
        console.error(`exec error: ${error}`);
        return json({ error: `exec error: ${error.message}` }, { status: 500 });
    }
}
