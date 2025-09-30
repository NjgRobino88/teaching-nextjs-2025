import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
import type { DB } from "@/lib/db-types";

export default async function AlbumDetails({ params }: { params: { id: string } }) {
  const db = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: new SQLite("db.sqlite"),
    }),
  });

  const { id } = params;
  console.log("Album ID:", id);

  const songs = await db
    .selectFrom("songs")
    .where("album_id", "=", Number(id))
    .selectAll()
    .execute();

  const autorName = await db
    .selectFrom("autors")
    .innerJoin("albums", "autors.id", "albums.autor_id")
    .where("albums.id", "=", Number(id))
    .select(["autors.name"])
    .executeTakeFirstOrThrow();

  const albumName = await db
    .selectFrom("albums")
    .where("albums.id", "=", Number(id))
    .select(["albums.name"])
    .executeTakeFirstOrThrow();

  


  function changeSecs(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <h1 className="text-4xl font-bold">Album Details Page</h1>
        <h2 className="text-2xl font-semibold">{albumName.name} by {autorName.name}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          Album ID: {id}.
        </p>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Duration</th>
            </tr>
          </thead>
          
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 font-medium">{song.name}</td>
                <td className="py-2 px-4 text-gray-500">{changeSecs(song.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
