import { DiseaseDetails } from "./pageDetails";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

async function getData(plantId, diseaseId) {
  const res = await fetch(
    `${BASE_URL}/plants/${plantId}/diseases/${diseaseId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }) {
  const res = await getData(params.plantId, params.diseaseId);

  return (
    <DiseaseDetails
      res={res}
      params={params}
      BACKEND_URL={BACKEND_URL}
      BASE_URL={BASE_URL}
    />
  );
}
