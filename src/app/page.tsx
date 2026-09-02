import { redirect } from "next/navigation";

// The default locale is Polish; send visitors to /pl.
export default function RootPage() {
  redirect("/pl");
}
