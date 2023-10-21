"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faBars,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { useState } from "react";

export function PlantDetails({ params, res, BASE_URL, BACKEND_URL }) {
  const [ttsPath, setTTSPath] = useState();
  const [isSubmitting, setIsSubmitting] = useState();
  const submitText = async (ttsText) => {
    if (!ttsText) {
      return;
    }

    let body = {
      text: ttsText,
    };

    body = JSON.stringify(body);

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/plants/tts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }).then(async (response) => {
        console.log("data-response", response.headers.get("content-type"));
        if (response.status == 500) {
          throw { message: "Internal server error" };
        }

        const data =
          response.headers.get("content-type") === "application/json"
            ? await response.json()
            : { message: "Could not process text" };

        if (!response.ok) {
          throw data;
        }

        return data;
      });

      console.log("submitImage", response);
      setTTSPath(response.path);
    } catch (e) {
      console.warn("warning", e?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Link href="/plants">
            <button className="btn btn-square btn-sm btn-outline text-lg">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Link>
          <div className="text-xl font-semibold">
            <span>#{params.plantId}</span> {res.name}
          </div>
        </div>
        <button className="btn btn-square btn-ghost text-xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <figure className="relative h-96">
        <Image
          src={`${BACKEND_URL}/media/${res.image}`}
          alt="image"
          style={{ objectFit: "cover" }}
          fill
          className="rounded border-2 border-primary"
        />
      </figure>

      <main className="flex flex-col pb-4 gap-2">
        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="font-bold text-xl">{res.name}</span>

          <span className="text-lg text-primary mt-0">Description</span>
          <span
            className="text-justify text-md"
            dangerouslySetInnerHTML={{ __html: marked.parse(res.details) }}
          ></span>

          <div className="flex flex-col gap-1 mt-3">
            <div>
              <button
                className="btn btn-primary btn-sm text-xs"
                onClick={() => submitText(res.details)}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}

                <span>Play</span>
                <span className="text-lg">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </span>
              </button>
            </div>
            {!isSubmitting && ttsPath && (
              <audio controls>
                <source src={`${BACKEND_URL}/${ttsPath}`} type="audio/wav" />
                Your browser does not support the audio tag.
              </audio>
            )}
          </div>
        </div>

        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="text-lg text-primary mt-3">Diseases</span>
          <span className="flex flex-wrap gap-2">
            {res.diseases.map((item) => (
              <Link
                href={`/plants/${res.id}/diseases/${item.id}`}
                key={item.id}
              >
                <button className="btn btn-primary btn-sm btn-outline capitalize">
                  {item.name}
                </button>
              </Link>
            ))}
          </span>
        </div>
      </main>
    </div>
  );
}
