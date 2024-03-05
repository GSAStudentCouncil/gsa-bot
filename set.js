// dist 폴더에 있는 모든 .js .ts 파일들에서 `var IS_DIST = false;`를 찾아서 `var IS_DIST = true;`로 바꾸는 스크립트

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
dfs(distPath);

function dfs(dir) {
	const files = fs.readdirSync(dir);
	
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = fs.statSync(filePath);
		
		if (stats.isDirectory()) {
			console.log(filePath);
			dfs(filePath);
		}
		else if (file.endsWith('.js') || file.endsWith('.ts')) {
			update(filePath);
		}
	}
}

function update(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8')
		.replace('var IS_DIST = false;', 'var IS_DIST = true;')
		.replaceAll('../../global_modules/', '')
	
	fs.writeFileSync(filePath, content, 'utf-8');
	
	console.log(`${filePath} is updated`);
}