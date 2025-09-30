export default function About() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">About Page</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          This is the About page of the project. Here you can add some
          description about what your app does, who built it, or anything else
          you’d like visitors to know. Keep it simple, clean, and informative.
        </p>
      </main>
    </div>
  );
}
