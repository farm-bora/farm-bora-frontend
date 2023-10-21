"use server";

import { PlantListing } from "./pageList";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

export async function getPlants() {
  const res = await fetch(`${BASE_URL}/plants`, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getPlants();

  return (
    <PlantListing data={data} BASE_URL={BASE_URL} BACKEND_URL={BACKEND_URL} />
  );
}
