import {app} from "./app.js";
import db from "./database/db.js";

async function main() {
    await db.sync({/*force:true*/})
    app.listen(6700);
    ('🚀server up in http://localhost:6700/')
}

try{
	await db.authenticate()
		('conected to database')
	}catch(error){
        ('error: ${error}')
	}

main();

