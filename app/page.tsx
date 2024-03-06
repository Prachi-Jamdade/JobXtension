export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
        <div className="z-10 max-w-5xl w-full flex-col space-y-[20px] items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-3xl mx-auto">Launching Soon in 2024</h1>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h1 className="text-4xl uppercase text-white">Job Pilot</h1>
          </div>
        </div>
      </div>
    </>
  );
}
