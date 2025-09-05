type FormMessageProps = {
  error: string;
}

function FormMessage({error}: FormMessageProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-md p-3 shadow-lg z-10">
      <p className="text-red-700 text-sm">{error}</p>
    </div>
  );
}

export default FormMessage;
