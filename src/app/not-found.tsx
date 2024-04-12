import ErrorCard from "@/components/ErrorCard";

export default function NotFound() {
  return (
    <ErrorCard
      heading="404 Not Found"
      message="This page isn't available."
      link="/"
      button="go home"
    />
  );
}
