let project_name = require('path').basename(process.cwd());
require('child_process').exec('\
	cd tools;\
	make PROJECT_NAME={};\
	'.replace("{}", project_name), (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
	} else {
		stdout && console.log(`stdout: ${stdout}`);
		stderr && console.log(`stderr: ${stderr}`);
	}});
