type ErrorProps = {
  errorMessage: string | undefined;
};

export function Error({ errorMessage }: ErrorProps) {
  if (errorMessage)
    return (
      <p role="alert" className="text-red-500">
        {errorMessage}
      </p>
    );
}
