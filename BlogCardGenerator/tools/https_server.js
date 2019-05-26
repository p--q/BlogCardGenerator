const { exec } = require('child_process');  // destructuring assignment	
let cmds = 'ps xo pid,args | grep node| grep live-server | grep -v pid,args | sed -e "s/^[ ]*//g" | cut -d " " -f 1 | xargs kill -9'
execCmds(cmds)  // live-serverを起動しているnodeプロセスをkillする。動作になんらかのエラーが出る。
cmds = 'NVM_DIR="$HOME/.nvm";\. "$NVM_DIR/nvm.sh";\. "$NVM_DIR/bash_completion";live-server --port=8081 --cors;'
execCmds(cmds)  // live-serverを起動。
function execCmds(cmds){
	exec(cmds, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
			}
			stdout && console.log(`stdout: ${stdout}`);
			stderr && console.log(`stderr: ${stderr}`);
		});	
}
	