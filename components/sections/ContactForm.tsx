"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import Button from "../ui/Button";

type FormData = {
  name: string;
  email: string;
  phone?: string;
  enquiry: string;
  message?: string;
};

const enquiryOptions = [
  { label: "Events", value: "Events" },
  { label: "PR", value: "PR" },
  { label: "Digital", value: "Digital" },
  { label: "Quote", value: "Quote" },
  { label: "Other", value: "Other" },
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const [sent, setSent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const enquiry = watch("enquiry");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      alert("Submission error.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-[28px] max-w-[557px] w-full"
    >
      {/* Name */}
      <div className="relative space-y-[15px]">
        <label className="block font-medium">Name*</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={`w-full h-[42px] border px-4 py-2 rounded-[8px] ${
            errors.name ? "border-red-500" : "border-[#1a1a3f]"
          }`}
        />
        {errors.name && (
          <span className="absolute bottom-[3px] left-[10px] px-[8px] py-[4px] bg-blank rounded-full">
            <p className="small text-red-500 ">{errors.name.message}</p>
          </span>
        )}
      </div>

      {/* Email */}
      <div className="relative space-y-[15px]">
        <label className="block font-medium">Email*</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
          })}
          className={`w-full h-[42px] border px-4 py-2 rounded-[8px] ${
            errors.email ? "border-red-500" : "border-[#1a1a3f]"
          }`}
        />
        {errors.email && (
          <span className="absolute bottom-[3px] left-[10px] px-[8px] py-[4px] bg-blank rounded-full">
            <p className="small text-red-500 ">{errors.email.message}</p>
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-[15px]">
        <label className="block font-medium">Phone Number</label>
        <input
          {...register("phone")}
          className="w-full h-[42px] border px-4 py-2 rounded-[8px] border-[#1a1a3f]"
        />
      </div>

      {/* Enquiry Type */}
      <div className="space-y-[15px]">
        <label className="block  font-medium">Enquiry Type*</label>
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`border px-4 py-2 rounded-[8px] cursor-pointer text-[16px] text-silver ${
              errors.enquiry ? "border-red-500" : "border-[#1a1a3f]"
            }`}
          >
            {enquiry || "Select enquiry type"}
          </div>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 bg-white border mt-1 rounded-[8px] z-10 max-h-60 overflow-y-auto border-[#1a1a3f]">
              {enquiryOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setValue("enquiry", option.value, { shouldValidate: true });
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    enquiry === option.value ? "bg-gray-100" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.enquiry && (
          <p className="text-red-500 text-sm mt-1">{errors.enquiry.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-[15px]">
        <label className="block font-medium">Message</label>
        <textarea
          {...register("message")}
          className="w-full h-[165px] border px-4 py-2 rounded-[8px] border-[#1a1a3f]"
          rows={5}
        />
      </div>

      <Button type="submit" text="Send" color="black" link="" />

      {isSubmitSuccessful && sent && (
        <p className="text-green-600 font-medium mt-4">
          Message sent successfully!
        </p>
      )}
    </form>
  );
}
