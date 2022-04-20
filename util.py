import sqlite3
import bcrypt

salt = bcrypt.gensalt()
hash = bcrypt.hashpw(b'admin', salt)

print(f"{salt=}")
print(f"{hash=}")

with sqlite3.connect('auth.db') as con:
    con.execute('CREATE TABLE IF NOT EXISTS users(email TEXT NOT NULL PRIMARY KEY, salt TEXT NOT NULL, hash TEXT NOT NULL);')
    con.execute('INSERT INTO users(email, salt, hash) VALUES(?, ?, ?);', ("admin@umkc.edu", salt, hash))