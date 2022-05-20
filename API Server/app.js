var express = require('express');
var bodyParser = require('body-parser');
const { Pool } = require('pg');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

var isWindows = process.platform.includes("win");
console.log("Windows = " + isWindows);

// handle requests

// RETRIEVE count - send value of first row of api_count table


// app.get('/info', (request, response) => {
    // pool.query('SELECT u.name, u.registered, s.session_end, g.geolocation FROM plan_users u, plan_geolocations g, plan_sessions s WHERE u.id = g.user_id AND u.id = s.user_id AND s.id = (SELECT MAX(id) FROM plan_sessions x where x.user_id = u.id)')
	// .then(res => {
		// arr = [];
		// res.rows.forEach(val => {
			// console.log('DB response: ' + val);
			// let registerDate = new Date(0);
			// registerDate.setUTCSeconds(val.registered/1000);
			// let endDate = new Date(0);
			// endDate.setUTCSeconds(val.session_end/1000);
			// arr.push([val.name, registerDate.toLocaleString(), endDate.toLocaleString(), val.geolocation]);
		// });
	    // response.send(arr);
	// })
	// .catch(err =>
	       // setImmediate(() => {
		   // //throw err;
	       // }));
// })

app.get('/players', (request, response) => {
    pool.query('SELECT name FROM plan_users')
	.then(res => {
		arr = [];
		res.rows.forEach(val => {
			console.log('DB response: ' + val);
			arr.push(val.name);
		});
	    response.send(arr);
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/ping/:player', (request, response) => {
	console.log('GETTING PING FOR ' + request.params.player);
    pool.query('SELECT p.avg_ping FROM plan_ping p, plan_users u WHERE u.name = ($1) AND p.user_id = u.id', [request.params.player])
	.then(res => {
		let ping = '';
		if (res.rows.length == 0){
			console.log("NO PING FOUND");
			ping = "Not Found"
		}
		else{
			ping = res.rows[0].avg_ping;
			console.log("PING: " + ping);
		}
		ping = (ping == null ? '' : ping);
	    response.send(ping.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/lastSeen/:player', (request, response) => {
	console.log('GETTING lastSeen FOR ' + request.params.player);
    pool.query('SELECT s.session_end FROM plan_users u, plan_sessions s WHERE u.name = ($1) AND u.id = s.user_id AND s.id = (SELECT MAX(id) FROM plan_sessions x where x.user_id = u.id)', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO lastSeen FOUND");
			rtn = "Unknown"
		}
		else{
			let endDate = new Date(0);
			endDate.setUTCSeconds(res.rows[0].session_end/1000);
			rtn = endDate.toLocaleString();
			console.log("lastSeen: " + rtn);
		}
	    response.send(rtn);
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/kills/:player', (request, response) => {
	console.log('GETTING kills FOR ' + request.params.player);
    pool.query('SELECT SUM(s.mob_kills) FROM plan_sessions s, plan_users u WHERE u.name = ($1) AND s.user_id = u.id', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO KILLS FOUND");
			rtn = '???';
		}
		else{
			rtn = res.rows[0].sum;
			console.log("KILLS: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/deaths/:player', (request, response) => {
	console.log('GETTING deaths FOR ' + request.params.player);
    pool.query('SELECT SUM(s.deaths) FROM plan_sessions s, plan_users u WHERE u.name = ($1) AND s.user_id = u.id', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO deaths FOUND");
			rtn = '???';
		}
		else{
			rtn = res.rows[0].sum;
			console.log("DEATHS: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/registered/:player', (request, response) => {
	console.log('GETTING registered FOR ' + request.params.player);
    pool.query('SELECT u.registered FROM plan_users u WHERE u.name = ($1)', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO registered FOUND");
			rtn = '???';
		}
		else{
			let startDate = new Date(0);
			startDate.setUTCSeconds(res.rows[0].registered/1000);
			rtn = startDate.toLocaleString();
			console.log("registered: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/op/:player', (request, response) => {
	console.log('GETTING op FOR ' + request.params.player);
    pool.query('SELECT i.opped FROM plan_users u, plan_user_info i WHERE u.name = ($1) AND i.user_id = u.id', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO op FOUND");
			rtn = '???';
		}
		else{
			if (res.rows[0].opped == 1){
				rtn = "Yes";
			}
			else{
				rtn = "No";
			}
			console.log("op: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/banned/:player', (request, response) => {
	console.log('GETTING banned FOR ' + request.params.player);
    pool.query('SELECT i.banned FROM plan_users u, plan_user_info i WHERE u.name = ($1) AND i.user_id = u.id', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO banned FOUND");
			rtn = '???';
		}
		else{
			if (res.rows[0].banned == 1){
				rtn = "Yes";
			}
			else{
				rtn = "No";
			}
			console.log("banned: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/kicked/:player', (request, response) => {
	console.log('GETTING kicked FOR ' + request.params.player);
    pool.query('SELECT u.times_kicked FROM plan_users u WHERE u.name = ($1)', [request.params.player])
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO kicked FOUND");
			rtn = '???';
		}
		else{
			rtn = res.rows[0].times_kicked;
			console.log("kicked: " + rtn);
		}
		rtn = (rtn == null ? '' : rtn);
	    response.send(rtn.toString());
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/serverStats', (request, response) => {
	console.log('GETTING serverStats');
    pool.query('SELECT t.date, t.cpu_usage, t.ram_usage, t.free_disk_space, t.players_online, s.web_address FROM plan_tps t, plan_servers s WHERE s.id = t.server_id AND t.date = (SELECT MAX(date) FROM plan_tps)')
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO serverStats FOUND");
			rtn = '???';
		}
		else{
			let obj = res.rows[0];
			let startDate = new Date(0);
			startDate.setUTCSeconds(obj.date/1000);
			obj.date = startDate.toLocaleString();
			obj.web_address = obj.web_address.substring(obj.web_address.indexOf("//") + 2, obj.web_address.lastIndexOf(":"));
			rtn = JSON.stringify(obj);
			console.log("serverStats: " + rtn);
		}
	    response.send(rtn);
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

app.get('/worldStats', (request, response) => {
	console.log('GETTING worldStats');
    pool.query('SELECT t.date, t.entities, t.chunks_loaded, w.world_name FROM plan_tps t, plan_worlds w WHERE w.id = 1 AND t.date = (SELECT MAX(date) FROM plan_tps)')
	.then(res => {
		let rtn = '';
		if (res.rows.length == 0){
			console.log("NO worldStats FOUND");
			rtn = '???';
		}
		else{
			let obj = res.rows[0];
			let startDate = new Date(0);
			startDate.setUTCSeconds(obj.date/1000);
			obj.date = startDate.toLocaleString();
			rtn = JSON.stringify(obj);
			console.log("worldStats: " + rtn);
		}
	    response.send(rtn);
	})
	.catch(err =>
	       setImmediate(() => {
		   //throw err;
	       }));
})

// catch 404 and forward to error handler

app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get('env') === 'development' ? err : {};

  // render the error page
  response.status(err.status || 500);
});


/* Main program */

console.log(`Starting api-server-db`);

const lib = require('./mcalib');
// lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "anansi.stolaf.edu";
const user = 'li24';    // CHANGE to your username, e.g., jones1
var password = '';
if (isWindows){
	password = lib.getPGPassword(dbHost);  // uncomment for Windows
}
const dbName = 'mca_s22';
const schema = 'mca_s22_mc';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

var pool = null;

if (isWindows){
	pool = new Pool({
		user: user,
	   password: password,                      // uncomment for Windows
		host: dbHost,
		database: dbName,
		port: 5432,
	});
}
else{
	pool = new Pool({
		user: user,
		host: dbHost,
		database: dbName,
		port: 5432,
	});
}


pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

console.log(`Connected to database ${dbName} on ${dbHost}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = app;
