"use client";

import { useState } from "react";
import ukData from "./data/uk.json";
import usData from "./data/us.json";
import styles from "./tutoring-calculator.module.scss";

const getLatestYearData = (data) => {
  const latestData = {};

  Object.keys(data).forEach((subject) => {
    const years = Object.keys(data[subject])
      .map(Number)
      .sort((a, b) => b - a);
    const latestYear = years[0];
    latestData[subject] = {
      year: latestYear.toString(),
      charge_rate: data[subject][latestYear]?.charge_rate || 0,
      pay_rate: data[subject][latestYear]?.pay_rate || 0,
    };
  });

  return latestData;
};

const getMinMaxValues = (value) => {
  const min = (value * 0.875).toFixed(2);
  const max = (value * 1.125).toFixed(2);
  return { min, max };
};

export const TutoringCalculator = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const latestUSData = getLatestYearData(usData);
  const latestUKData = getLatestYearData(ukData);

  const subjects = [...Object.keys(latestUSData), ...Object.keys(latestUKData)];
  const uniqueSubjects = Array.from(new Set(subjects)).sort();

  const getSubjectInfo = (subject) => {
    const isUK = !!latestUKData[subject];
    const data = isUK ? latestUKData[subject] : latestUSData[subject];
    const symbol = isUK ? "£" : "$";

    const { min: minCharge, max: maxCharge } = getMinMaxValues(
      data.charge_rate
    );
    const { min: minPay, max: maxPay } = getMinMaxValues(data.pay_rate);

    return {
      symbol,
      minCharge,
      maxCharge,
      minPay,
      maxPay,
    };
  };

  const subjectInfo = selectedSubject ? getSubjectInfo(selectedSubject) : null;

  return (
    <div className={styles.calculator}>
      <div className="main-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={styles.selectWrapper}>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Please select a subject --</option>
          {uniqueSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.replace(/_/g, " ")}
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
              * <i>Lorem ipsum dolor sit amet, consectetur adipisci</i>
            </p>
          </div>
        </>
      )}
    </div>
  );
};
