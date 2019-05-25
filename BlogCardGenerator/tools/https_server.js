require('child_process').exec('\
	NVM_DIR="$HOME/.nvm";\
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh";\
	[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion";\
	live-server --port=8081;\
	', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
	} else {
		stdout && console.log(`stdout: ${stdout}`);
		stderr && console.log(`stderr: ${stderr}`);
	}});
