import { Plugin } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';

export default class TogglePropteriesPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'switch-properties-view',
			name: 'Switch Properties View',
			callback: async () => {
				try {
					const vaultPath = (this.app.vault.adapter as any).basePath;
					const configAppFilePath = path.join(vaultPath, this.app.vault.configDir, 'app.json');
					try {
						const raw = fs.readFileSync(configAppFilePath, 'utf-8');
						const json = JSON.parse(raw);

						if (json.propertiesInDocument == 'hidden') {
							json.propertiesInDocument = 'visible';
						} else {
							json.propertiesInDocument = 'hidden'
						}
						fs.writeFileSync(configAppFilePath, JSON.stringify(json, null, 2), 'utf-8');

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