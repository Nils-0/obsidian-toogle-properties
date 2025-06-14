import { Notice, Plugin } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

export default class TogglePropteriesPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'toggle-properties',
			name: 'Toggle Properties',
			callback: async () => {
				try {
					const vaultPath = (this.app.vault.adapter as any).basePath;
					const configFilePath = path.join(vaultPath, '.obsidian', 'app.json');
					try {
						const raw = fs.readFileSync(configFilePath, 'utf-8');
						const json = JSON.parse(raw);

						if (json.propertiesInDocument == 'hidden') {
							json.propertiesInDocument = 'visible';
						} else {
							json.propertiesInDocument = 'hidden'
						}
						fs.writeFileSync(configFilePath, JSON.stringify(json, null, 2), 'utf-8');

					} catch (err) {
						console.error("Fehler beim Lesen oder Schreiben der Datei:", err);
					}

				} catch (error) {
					console.error('Fehler beim Zugriff auf das Vault:', error);
				}
			},
		});
	}
}