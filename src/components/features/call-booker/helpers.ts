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

  const formattedSlots = slots.map((slot: any) => [
    new Date(slot[0]),
    new Date(slot[1]),
  ]);

  const dates = formattedSlots.map((slot: any) => slot[0]);
  return {
    formattedSlots,
    dates,
  };
};
