import {app} from "./app.js";
import db from "./database/db.js";

async function main() {
    await db.sync({/*force:true*/})
    app.listen(6700);
    console.log('🚀server up in http://localhost:6700/')
}

try{
	await db.authenticate()
		console.log('conected to database')
	}catch(error){
        console.log('error: ${error}')
	}

main();

