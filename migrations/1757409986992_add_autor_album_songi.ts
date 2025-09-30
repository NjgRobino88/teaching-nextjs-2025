import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	await
	sql`
		CREATE TABLE autors (
			id INTEGER PRIMARY KEY AUTOINCREMENT not null,
			name TEXT NOT NULL,
			bio TEXT
		) STRICT
	`.execute(db);

	await
	sql`
		CREATE TABLE albums (
			id INTEGER PRIMARY KEY AUTOINCREMENT not null,
			autor_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			release_date integer NOT NULL,
			FOREIGN KEY (autor_id) REFERENCES autors(id)
		) STRICT
	`.execute(db);

	await
	sql`
		CREATE TABLE songs (
			id INTEGER PRIMARY KEY AUTOINCREMENT not null,
			album_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			duration integer NOT NULL,
			FOREIGN KEY (album_id) REFERENCES albums(id)
		) STRICT
	`.execute(db);
}


