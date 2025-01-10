"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef } from "react";

import { CloseSvg } from "@/svgs/close";
import { SearchSvg } from "@/svgs/search";

import styles from "./search.module.scss";

export const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query && searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  }, [query]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search")?.toString().trim();

    if (searchTerm) {
      router.push(`/blog/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        ref={searchInputRef}
        required
        placeholder="Search"
        defaultValue={query}
      />

      {query ? (
        <Link href="/blog">
          <CloseSvg />
        </Link>
      ) : (
        <button type="submit">
          <SearchSvg />
        </button>
      )}
    </form>
  );
};
