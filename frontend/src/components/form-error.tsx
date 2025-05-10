type FormErrorProps = {
  message: string;
};

export function FormError({ message }: FormErrorProps) {
  return (
    <p className="text-xs text-red-400">{message}</p>
  );
}
