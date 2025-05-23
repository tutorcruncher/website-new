"use client";
import clsx from "clsx";
import { addMonths, formatDate, formatTime, isSameDay } from "helpers/dates";
import Image from "next/image";
import type { FormEvent } from "react";
import { createRef, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import ReCAPTCHA from "react-google-recaptcha";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

import styles from "./call-booker.module.scss";
import { fetchAvailableSlots, getUpcomingWeekSlotDates } from "./helpers";
import { getCurrencyOptions } from "../booking-widget/helpers";
import { regions } from "app/data/regions/regions";
import { useSearchParams } from "next/navigation";
import { Slot } from "./types";
import Link from "next/link";

const CALL_TYPE = "sales";

export const CallBooker = ({ rep, rb }) => {
  const [openSlots, setOpenSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Slot[]>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Slot>(null);
  const [cachedSlots, setCachedSlots] = useState<[]>([]);
  const [isExpress, setIsExpress] = useState(false);
  const [minDate, setMinDate] = useState(new Date());
  const [calendarReady, setCalendarReady] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [revenueOptions, setRevenueOptions] = useState(null);
  const [countryCode, setCountryCode] = useState("GB");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLowAvailability, sethasLowAvailability] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");

  const searchParams = useSearchParams();
  const recaptchaRef = createRef();

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return setTimezone(zone);
  }, []);

  const handleDateChange = (dates: Date[]) => {
    const selected = dates[0];
    setSelectedDate(selected);
    const daySlots = cachedSlots.filter((slot) => isSameDay(slot[0], selected));
    setSelectedTimeSlots(daySlots.length ? daySlots : null);
  };

  useEffect(() => {
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
          setCountryCode(country_code);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchSlots = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const express = urlParams.get("ex") !== null;
      setIsExpress(express);

      const startDate = new Date();

      if (!express) {
        startDate.setHours(startDate.getHours() + 2);
      }
      setMinDate(startDate);

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      try {
        const { formattedSlots, dates } = await fetchAvailableSlots(
          String(rep.hermes_admin_id),
          startDate,
          endDate
        );

        const availableDaysInWeek = getUpcomingWeekSlotDates(dates);
        if (availableDaysInWeek.length < 3) {
          sethasLowAvailability(true);
        }
        setCachedSlots(formattedSlots);
        setOpenSlots(dates);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
    getCountryCode();
  }, [isExpress, rep.hermes_admin_id]);

  useEffect(() => {
    setRevenueOptions(getCurrencyOptions(countryCode));
  }, [countryCode]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // @ts-expect-error -- captcha ref unkown
    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      setErrorMessage("Please complete the captcha to proceed");
      return;
    }

    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const region = regions.find(
      (region) => region.region_code === countryCode.toLowerCase()
    );

    const estimatedIncome = formData.get("revenue");
    const pricePlan = revenueOptions.find(
      ([, value]) => value === estimatedIncome
    )?.[0];

    const bdrPersonId =
      localStorage.getItem("_bdr_person_id") || searchParams.get("bdr");
    const utmCampaign =
      localStorage.getItem("_tc_campaign") || searchParams.get("utm_campaign");
    const utmSource =
      localStorage.getItem("_tc_source") || searchParams.get("utm_source");

    const hermesData = {
      admin_id: rep.hermes_admin_id,
      bdr_person_id: bdrPersonId,
      call_type: CALL_TYPE,
      company_name: formData.get("company"),
      country: countryCode,
      currency: region.currency_code,
      email: formData.get("email"),
      estimated_income: estimatedIncome,
      meeting_dt: formData.get("selected-time"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      price_plan: pricePlan,
      utm_campaign: utmCampaign,
      utm_source: utmSource,
      website: formData.get("website"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HERMES_BASE_URL}/callbooker/${CALL_TYPE}/book/`,
        {
          method: "POST",
          body: JSON.stringify(hermesData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status === "error") {
        setErrorMessage("Sorry something went wrong, please try again");
      } else {
        localStorage.setItem("call_data", JSON.stringify(hermesData));
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Sorry something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };
  const defaultRevenueOptionIndex = +rb;

  if (isSubmitted) {
    return (
      <div className={clsx(styles.bookWidget)}>
        <Image
          src={rep.img_path}
          width={80}
          height={80}
          alt=""
          style={{
            borderRadius: "50%",
            margin: "0 auto 10px",
          }}
        />
        <Heading size="xxsmall" center variant="h3">
          Meet with {rep.rep_name} from TutorCruncher
        </Heading>

        <p>
          Thanks for booking with us! We&apos;ve just sent you a calendar invite
          which also includes the video call URL. We look forward to hearing
          about your business!
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.bookWidget, [selectedDate && styles.dateSelected])}
    >
      <Image
        src={rep.img_path}
        width={80}
        height={80}
        alt=""
        style={{
          borderRadius: "50%",
          margin: "0 auto 10px",
        }}
      />
      <Heading size="xxsmall" center variant="h3">
        Meet with {rep.rep_name} from TutorCruncher
      </Heading>
      {hasLowAvailability && (
        <div className={styles.lowAvailability}>
          {rep.rep_name} has low availability in the next week. If you don
          {"'"}t see any time that suits you try {rep.alt_rep_name}
          {"'"}s calendar{" "}
          <b>
            <Link href={`/book-a-call/${rep.alt_rep_hermes_admin_id}`}>
              here
            </Link>
            .
          </b>
        </div>
      )}
      {!selectedDate ? (
        <div
          className={clsx(styles.calendarContainer, [
            calendarReady && styles.calendarReady,
          ])}
        >
          <Flatpickr
            className={styles.calendar}
            value={selectedDate}
            onChange={handleDateChange}
            onReady={() => setCalendarReady(true)}
            options={{
              inline: true,
              minDate: minDate,
              maxDate: addMonths(minDate, 1),
              enable: openSlots,
              monthSelectorType: "static",
              disableMobile: true,
            }}
          />
          <p className="text-center">
            Your Timezone: {timezone} <br />
            Meeting Duration: 30 minutes
          </p>
        </div>
      ) : null}

      {selectedDate && !selectedTimeSlot ? (
        <div className={styles.timeSlotsContainer}>
          <div className={styles.heading}>
            <button type="button" onClick={() => setSelectedDate(null)}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                width={20}
                height={20}
              >
                <g></g>
                <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
              </svg>
            </button>
            <div>{formatDate(selectedDate)}</div>
            <span />
          </div>
          <div className={styles.timeSlots}>
            {selectedTimeSlots.map((slot, index) => (
              <button key={index} onClick={() => setSelectedTimeSlot(slot)}>
                {formatTime(slot[0])} - {formatTime(slot[1])}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {selectedTimeSlot ? (
        <>
          <div className={styles.heading}>
            <button type="button" onClick={() => setSelectedTimeSlot(null)}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                width={20}
                height={20}
              >
                <g></g>
                <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
              </svg>
            </button>
            <div>
              {formatDate(selectedDate)} <br />@{" "}
              {formatTime(selectedTimeSlot[0])} -{" "}
              {formatTime(selectedTimeSlot[1])}
            </div>
            <span />
          </div>
          <form id="call-booker-form" onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name || searchParams.get("name")}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email || searchParams.get("email")}
            />
            <input
              type="text"
              id="company"
              placeholder="Company name"
              required
              name="company"
              maxLength={255}
              onChange={(e) => setCompany(e.target.value)}
              value={company || searchParams.get("company")}
            />
            <input
              type="text"
              id="website"
              name="website"
              maxLength={255}
              placeholder="Website"
              onChange={(e) => setWebsite(e.target.value)}
              value={website || searchParams.get("website")}
            />
            <input
              type="text"
              id="phone"
              name="phone"
              required
              maxLength={20}
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone || searchParams.get("phone")}
            />
            <input
              id="selected-time"
              name="selected-time"
              type="hidden"
              value={selectedTimeSlot ? selectedTimeSlot[0].toISOString() : ""}
            />
            <select
              name="revenue"
              defaultValue={
                revenueOptions?.[defaultRevenueOptionIndex]?.[1] || ""
              }
            >
              {revenueOptions?.map(([, label]) => (
                <option value={label} key={`revenue-option-${label}`}>
                  {label}
                </option>
              ))}
            </select>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
            />
            <Action type="submit" variant="outline" disabled={isLoading}>
              Submit
            </Action>
          </form>
        </>
      ) : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
};
