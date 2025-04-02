"use client";

import React from "react";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function Calendar() {
  const today = new Date();
  console.log( today );
  const [selected, setSelected] = React.useState<Date | undefined>(today);

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}

export default Calendar;