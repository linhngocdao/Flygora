"use client";
import React, { useState } from "react";
import { QuillFlygora } from "../ui/QuillFlygora";
import CustomCalendar from "../ui/CustomCalendar";

const QuillExample = () => {
  const [content, setContent] = useState("");
  const handleChange = (e: any) => {
    setContent(e);
  };
  return (
    <div>
      <CustomCalendar selected={new Date()} />
      <QuillFlygora value={content} onChange={handleChange} />
    </div>
  );
};

export default QuillExample;
