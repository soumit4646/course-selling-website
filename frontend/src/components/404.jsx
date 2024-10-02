import { useRouteError } from "react-router-dom";

export default function Page404() {
  const error = useRouteError();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-mono text-center">Oops!</h1>
        <p className="text-3xl">Sorry, an unexpected error has occurred.</p>
        <p className="text-2xl text-center text-slate-400">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
