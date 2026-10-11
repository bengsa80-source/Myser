import { notFound } from "next/navigation";
import SectorDirectory from "@/components/SectorDirectory";
import { directories } from "@/lib/platforms";
export function generateStaticParams() {
  return Object.keys(directories).map((sector) => ({ sector }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  if (!Object.hasOwn(directories, sector)) notFound();
  return <SectorDirectory sector={sector} />;
}
