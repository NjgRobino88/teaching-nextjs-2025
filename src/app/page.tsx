import Image from "next/image";
import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
import type { DB } from "@/lib/db-types";
import Link from "next/link";

export default async function Home() {
  const db = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new SQLite("db.sqlite"),
    }),
  });

  const albums = await db
    .selectFrom("albums")
    .innerJoin("autors", "albums.autor_id", "autors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "albums.autor_id",
      "autors.name as autor_name",
      "autors.bio",
    ])
    .execute();

  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/128px-Spotify_icon.svg.png"
          alt="Spotify logo"
          width={128}
          height={128}
          priority
        />

        <div className="grid grid-cols-4  gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-32 h-32 lg shadow-md"
                style={{ backgroundColor: randomColor() }}
              />
              <p className="mt-2 font-semibold">{album.name}</p>
              <p className="text-sm text-gray-500">{album.autor_name}</p>
              <p>ID: {album.id}</p>
              <div className="mt-6">
                  <Link
                    className="btn btn-primary btn-block"
                    href={`/album/${album.id}`}
                  >
                    Detail
                  </Link>
              </div>
            </div>
          ))}
        </div>

        {/* {new Date (album.relase_date).toDateString()} */}

        
      </main>
    </div>
  );
}
