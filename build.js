// "babel [input] --out-dir [output] --extensions [extension] --copy-files --ignore \"**/.*, *.json\""
const { exec } = require('child_process');

let [extension, input, output] = process.argv.slice(2);
exec(`babel ${input} --out-dir ${output} --extensions ${extension} --copy-files --ignore "${input}/.*, *.json, *.d.ts"`, (err, stdout, stderr) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stdout);
});