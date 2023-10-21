import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { PlantDetails } from "./pageDetails";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE;

async function getData(id) {
  const res = await fetch(`${BASE_URL}/plants/${id}`, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }) {
  const res = await getData(params.plantId);

  return (
    <PlantDetails
      params={params}
      res={res}
      BASE_URL={BASE_URL}
      BACKEND_URL={BACKEND_URL}
    />
  );
}
