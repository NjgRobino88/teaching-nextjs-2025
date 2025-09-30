import { DB } from '@/lib/db-types';
import type { Kysely } from 'kysely';
import { faker } from '@faker-js/faker';

export async function seed(db: Kysely<DB>): Promise<void> {
	await db.deleteFrom('songs').execute();
	await db.deleteFrom('albums').execute();
	await db.deleteFrom('autors').execute();

	for (let i = 0; i < 20; i++) {
		await db.insertInto('autors').values({
			name: faker.person.fullName(),
			bio: faker.lorem.paragraph(),
		}).execute();
	}

	const autors = await db.selectFrom('autors').selectAll().execute();

	for (const autor of autors) {
		const numAlbums = faker.number.int({ min: 0, max: 10 });

		for (let i = 0; i < numAlbums; i++) {
			await db.insertInto('albums').values({
				autor_id: autor.id,
				name: faker.music.album(),
				release_date: faker.date.past().getTime(),
			}).execute();
		}
	}

	const albums = await db.selectFrom('albums').selectAll().execute();

	for (const album of albums) {
		const typeOfAlbum = faker.number.int({ min: 1, max: 9 });

		let numSongs = 1;

		if (typeOfAlbum <= 2) {
			numSongs = 1;

		} else if (typeOfAlbum <= 5) {
			numSongs = faker.number.int({ min: 4, max: 6 });}


			else {
			numSongs = faker.number.int({ min: 10, max: 20 });
			}


			for (let i = 0; i < numSongs; i++) {
			await db.insertInto('songs').values({
				album_id: album.id,
				name: faker.music.songName(),
				duration: faker.number.int({ min: 90, max: 240 }),
			}).execute();


		}



		
		
	}
}
