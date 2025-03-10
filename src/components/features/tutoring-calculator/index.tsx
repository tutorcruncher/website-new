"use client";

import { useEffect, useState } from "react";
import data from "./data.json";
import { RegionData } from "./types";
import { getSubjectInfo, removeZeroValuesFromRegionData } from "./helpers";
import styles from "./tutoring-calculator.module.scss";
import { getCountryPath } from "@/helpers/get-country-path";
import { LoadingSvg } from "@/svgs/loading";

export const TutoringCalculator = ({ intro, statement }) => {
  const [region, setRegion] = useState<string | null>(null);
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [selectedQual, setSelectedQual] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function fetchRegion() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/loc/`
        );

        const { country_code }: { country_code: string } =
          await response.json();

        const fetchedRegion = getCountryPath(country_code) || "usa";
        setRegion(fetchedRegion);
      } catch {
        setRegion("usa");
      }
    }

    fetchRegion();
  }, []);

  useEffect(() => {
    const matchedData = data[region];

    if (matchedData) {
      const cleanedData = removeZeroValuesFromRegionData(matchedData);
      setRegionData(cleanedData);
    }
  }, [region]);

  if (!region || !regionData)
    return (
      <div className="text-center">
        <LoadingSvg />
      </div>
    );

  const qualLevelKeys = Object.keys(regionData.qual_levels);
  const subjectKeys = Object.keys(regionData.subjects);
  const subjectData = regionData.data[selectedSubject];

  const subjectInfo = subjectData
    ? getSubjectInfo(region, subjectData[selectedQual])
    : null;

  return (
    <div className={styles.calculator}>
      <div className="main-content">{intro}</div>
      <div className={styles.selectsWrapper}>
        <select
          value={selectedQual}
          onChange={(e) => setSelectedQual(e.target.value)}
          required
        >
          <option value="" disabled>
            Qualification Level:
          </option>
          {qualLevelKeys.map((k) => (
            <option key={k} value={k}>
              {regionData.qual_levels[k]}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          required
        >
          <option value="" disabled>
            Subject:
          </option>
          {subjectKeys.map((k) => (
            <option key={k} value={k}>
              {regionData.subjects[k]}
            </option>
          ))}
        </select>
      </div>

      {selectedSubject && subjectInfo && (
        <>
          <div className={styles.selectedSubject}>
            <div className="main-content">
              <div className={styles.results}>
                <div>
                  <p>On average people charge</p>
                  <p className={styles.amount}>
                    {subjectInfo.symbol}
                    {subjectInfo.minCharge} - {subjectInfo.symbol}
                    {subjectInfo.maxCharge}
                  </p>
                  <p>per hour</p>
                </div>

                <div>
                  <p>On average people pay</p>
                  <p className={styles.amount}>
                    {subjectInfo.symbol}
                    {subjectInfo.minPay} - {subjectInfo.symbol}
                    {subjectInfo.maxPay}
                  </p>
                  <p>per hour</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.statement}>
            <p>
              <i>{statement}</i>
            </p>
          </div>
        </>
      )}
    </div>
  );
};
