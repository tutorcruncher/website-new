import { Slot } from "./types";

export const fetchAvailableSlots = async (
  admin_id: string,
  start: Date,
  end: Date
) => {
  const searchParams = new URLSearchParams({
    admin_id,
    start_dt: start.toISOString(),
    end_dt: end.toISOString(),
  });

  const response = await fetch(`/api/callbooker?${searchParams.toString()}`);
  const { slots } = await response.json();

  const formattedSlots = slots.map((slot: Slot) => [
    new Date(slot[0]),
    new Date(slot[1]),
  ]);

  const dates = formattedSlots.map((slot: Slot) => slot[0]);
  return {
    formattedSlots,
    dates,
  };
};

export const getUpcomingWeekSlotDates = (slots) => {
  const dates = [];
  const processed_dates = new Set();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekFromToday = new Date();
  oneWeekFromToday.setDate(today.getDate() + 7);
  oneWeekFromToday.setHours(23, 59, 59, 999);

  slots.forEach((slot) => {
    if (!(slot instanceof Date)) {
      return;
    }

    if (slot >= today && slot <= oneWeekFromToday) {
      const slot_date = new Date(
        slot.getFullYear(),
        slot.getMonth(),
        slot.getDate()
      );
      const processed_date = slot_date.toISOString().split("T")[0];

      if (!processed_dates.has(processed_date)) {
        dates.push(slot_date);
        processed_dates.add(processed_date);
      }
    }
  });

  return dates;
};
