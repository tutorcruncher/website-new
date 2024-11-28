"use client";
import clsx from "clsx";
import { addMonths, formatDate, formatTime, isSameDay } from "helpers/dates";
import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";

import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

import styles from "./call-booker.module.scss";
import { fetchAvailableSlots } from "./helpers";

const CALL_TYPE = "sales";

export const CallBooker = ({ rep }) => {
  const [openSlots, setOpenSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<any[]>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [cachedSlots, setCachedSlots] = useState<any[]>([]);
  const [isExpress, setIsExpress] = useState(false);
  const [minDate, setMinDate] = useState(new Date());
  const [calendarReady, setCalendarReady] = useState(false);
  const [timezone, setTimezone] = useState(null);

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
        setCachedSlots(formattedSlots);
        setOpenSlots(dates);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [isExpress, rep.hermes_admin_id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const hermesData = {
      admin_id: "13",
      name: formData.get("name"),
      email: formData.get("email"),
      meeting_dt: formData.get("selected-time"),
      call_type: CALL_TYPE,
    };

    fetch(`https://hermes.tutorcruncher.com/callbooker/${CALL_TYPE}/book/`, {
      method: "POST",
      body: JSON.stringify(hermesData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.message);
        }
        alert("Booking successful!");
      })
      .catch((error) => {
        alert("Error booking call: " + error.message);
      });
  };

  return (
    <div
      className={clsx(styles.bookWidget, [selectedDate && styles.dateSelected])}
    >
      <Image
        src="https://tutorcruncher.com/assets/blog/tc-gaming-dino.653b242.png"
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
              monthSelectorType: "static", // Disables the dropdown for month selection
              disableMobile: true, // Ensure the same behavior on mobile
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
            {selectedTimeSlots.map((slot: any, index: number) => (
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
            <input id="name" name="name" placeholder="Name" required />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <input
              type="text"
              id="company-name"
              placeholder="Company name"
              required
              name="company-name"
              maxLength={255}
            />
            <input
              type="text"
              id="website"
              name="website"
              maxLength={255}
              placeholder="Website"
            />
            <input
              type="text"
              id="phone"
              name="phone"
              required
              maxLength={20}
              placeholder="Phone number"
            />
            <input
              id="selected-time"
              name="selected-time"
              type="hidden"
              value={selectedTimeSlot ? selectedTimeSlot[0].toISOString() : ""}
            />
            {/* <select
                class="estimated-income"
                id="estimated-income"
                required="required"
                name="estimated-income"
              ></select> */}
            <Action type="submit" variant="outline">
              Submit
            </Action>
          </form>
        </>
      ) : null}

      {/* {
          // confirmation}
          <p>
            Thanks for booking with us! We've just sent you a calendar invite
            which also includes the video call URL. We look forward to hearing
            about your business!
          </p>
        } */}
    </div>
  );
};
