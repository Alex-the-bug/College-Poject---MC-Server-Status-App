#Only tested on Windows machines
#Requires .pgpass file on user folder
#Takes database.db file from Minecraft server, parses it, and uploads data to Anansi PSQL database
#Example database.db is provided with this repo

import psycopg2, sqlite3, sys, time
from psycopg2.extras import execute_values
from pathlib import Path
 
sqdb='database.db'
sqlike='plan%'
pgdb='mca_s22'
pguser='li24' #replace with your own username
pgpswd=''
pghost='anansi.stolaf.edu'
pgport='5432'
pgschema='mca_s22_mc'

home = str(Path.home())
with open(home +  "\\.pgpass", 'r') as file:
    pgpswd = file.read().rstrip().split(':')[4]
 
consq=sqlite3.connect(sqdb)
cursq=consq.cursor()
 
conpg = psycopg2.connect(database=pgdb, user=pguser, password=pgpswd, host=pghost, port=pgport)
curpg = conpg.cursor()
curpg.execute("SET search_path TO %s, %s, public;" %(pgschema, pguser))

print("GOOD TO GO")

while True:
    tabnames=[]
    cursq.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%s'" % sqlike)
    tabgrab = cursq.fetchall()
    for item in tabgrab:
        tabnames.append(item[0])
    for table in tabnames:       
        cursq.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name = ?;", (table,))
        create = cursq.fetchone()[0]
        cursq.execute("SELECT * FROM %s;" %table)
        rows=cursq.fetchall()
        if (len(rows) == 0):
            continue
        
        # print(table)
        newCreate = create.replace(' boolean ', ' integer ').replace(' double ', ' real ')
        # print(create)
        # print(rows)
     
        try:
     
            
            curpg.execute("DROP TABLE IF EXISTS %s CASCADE;" %table)
            curpg.execute(newCreate)
            # curpg.execute("TRUNCATE %s CASCADE;" %table);
            execute_values(curpg, "INSERT INTO " + table + " VALUES %s;", rows)
            print('Created', table)
     
        except psycopg2.DatabaseError as e:
            print ('Error %s' % e) 
            # sys.exit(1)
                
        # print(table)
    conpg.commit()
    print("\n")
    time.sleep(20)


conpg.close()
consq.close()