"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const SALES_AGENTS = [
  {
    value: 1,
    label: "Sam",
  },
  {
    value: 2,
    label: "Fionn",
  },
  {
    value: 7,
    label: "Tony",
  },
];

export const HasBooked = () => {
  const router = useRouter();
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    router.push(`/book-a-call/${selectedValue}/`);
  };

  return (
    <div>
      <p>Which team member did you speak to?</p>
      <select onChange={handleSelectChange} defaultValue="*">
        <option value="*" disabled>
          Please select
        </option>
        {SALES_AGENTS.map(({ value, label }) => (
          <option value={value} key={label}>
            {label}
          </option>
        ))}
      </select>
      <p>
        <i>
          Don&apos;t worry if the sales person you spoke to isn&apos;t listed
          above, or you can&apos;t remember who it was. Just select{" "}
          <b>No/Not sure</b> above.
        </i>
      </p>
    </div>
  );
};
