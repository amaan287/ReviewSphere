interface ErrorStateProps {
  error: string;
  retry: () => void;
}

export const ErrorState = ({ error, retry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="mb-4 text-center text-red-500">{error}</div>
    <button
      onClick={retry}
      className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
);
