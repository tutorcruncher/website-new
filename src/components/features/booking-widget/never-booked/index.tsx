"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { Action } from "@/components/ui/action";

import { DEFAULT_SALES_PERSON_ID } from "../constants";
import { getCurrencyOptions } from "../helpers";
import styles from "./never-booked.module.scss";

export const NeverBooked = () => {
  const [revenueOptions, setRevenueOptions] = useState(null);
  const [selectedRevenueOption, setSelectedRevenueOption] = useState(null);
  const [selectedRevenueIndex, setSelectedRevenueIndex] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  const router = useRouter();

  const getCountryCode = async () => {
    let storedCountryCode = localStorage.getItem("_country_code");

    if (!storedCountryCode) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
        );

        const { country_code }: { country_code: string } =
          await response.json();
        storedCountryCode = country_code || "GB";
        localStorage.setItem("_country_code", storedCountryCode);
      } catch {
        storedCountryCode = "GB";
      }
    }

    setCountryCode(storedCountryCode);
  };

  const loadOptions = (code: string) => {
    const options = getCurrencyOptions(code);
    setRevenueOptions(options);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

  useEffect(() => {
    if (countryCode) {
      loadOptions(countryCode);
    }
  }, [countryCode]);

  const handleBooking = async () => {
    let salesperson_id = DEFAULT_SALES_PERSON_ID;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/choose-roundrobin/sales/?plan=${selectedRevenueOption}&country_code=${countryCode}`
      );
      const data = await response.json();
      salesperson_id = data["id"];
    } catch (e) {
      console.error(e);
      salesperson_id = DEFAULT_SALES_PERSON_ID;
    } finally {
      router.push(`/book-a-call/${salesperson_id}/?rb=${selectedRevenueIndex}`);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex - 1;
    const selectedValue = e.target.value;

    setSelectedRevenueOption(selectedValue);
    setSelectedRevenueIndex(selectedIndex);
  };

  return (
    <>
      <p>
        So we can work out who the best person to help you, please answer the
        following:
      </p>
      <div className={styles.revenueSelect}>
        <p>Roughly, what is your monthly revenue?</p>
        <select onChange={handleSelectChange} defaultValue="*">
          <option value="*" disabled>
            Please select
          </option>
          {revenueOptions &&
            revenueOptions.map((opt) => (
              <option value={opt[0]} key={opt[1]}>
                {opt[1]}
              </option>
            ))}
        </select>
      </div>
      <Action onClick={() => handleBooking()} disabled={!selectedRevenueOption}>
        Book a call
      </Action>
    </>
  );
};
