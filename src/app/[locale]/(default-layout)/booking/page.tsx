"use client";
import ButtonPhu from "@/components/Clients/ui/ButtonPhu";
import ButtonTour from "@/components/Clients/ui/buttonPrimary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface BookingPageProps {
  participant1?: string;
  date?: string;
}

// Zod schema for participant validation
const participantSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must not exceed 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must not exceed 50 characters")
    .trim(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  birthDate: z
    .string()
    .min(1, "Birthday is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 5 && age <= 100;
    }, "Age must be between 5 and 100 years"),
  gender: z.string().min(1, "Gender is required"),
  country: z.string().min(1, "Country is required"),
  passportId: z
    .string()
    .min(1, "Passport No./Citizen ID No. is required")
    .min(6, "Passport/ID must be at least 6 characters")
    .max(20, "Passport/ID must not exceed 20 characters"),
  phonePrefix: z.string().min(1, "Phone prefix is required"),
  phone: z
    .string()
    .min(1, "Mobile phone is required")
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  hearAbout: z.string().min(1, "Please select how you heard about us"),
  specialRequirements: z
    .string()
    .max(500, "Special requirements must not exceed 500 characters")
    .optional()
    .transform((val) => val ?? ""),
});

// Zod schema for billing validation
const billingSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must not exceed 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must not exceed 50 characters")
    .trim(),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phonePrefix: z.string().min(1, "Phone prefix is required"),
  phone: z
    .string()
    .min(1, "Mobile phone is required")
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
});

// Main booking schema
const bookingSchema = z.object({
  participants: z.array(participantSchema).min(1, "At least one participant is required"),
  billing: billingSchema,
  agreedToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the booking policy",
  }),
  voucherCode: z
    .string()
    .optional()
    .transform((val) => val ?? ""),
});

// Manual type definition để tránh conflicts
interface BookingFormData {
  participants: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    gender: string;
    country: string;
    passportId: string;
    phonePrefix: string;
    phone: string;
    hearAbout: string;
    specialRequirements?: string;
  }[];
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phonePrefix: string;
    phone: string;
  };
  agreedToPolicy: boolean;
  voucherCode?: string;
}

const BookingPage: React.FC<BookingPageProps> = ({ participant1, date }) => {
  console.log(participant1, date);

  const [showPaxInput, setShowPaxInput] = useState<boolean>(false);
  const [participantForms, setParticipantForms] = useState<{ [key: number]: boolean }>({
    0: true,
  });
  const [showVoucherForm, setShowVoucherForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const pricePerPerson = 180000;

  // Form setup with react-hook-form and zod
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: [
        {
          firstName: "",
          lastName: "",
          email: "",
          birthDate: "",
          gender: "",
          country: "",
          passportId: "",
          phonePrefix: "",
          phone: "",
          hearAbout: "",
          specialRequirements: "",
        },
      ],
      billing: {
        firstName: "",
        lastName: "",
        email: "",
        phonePrefix: "",
        phone: "",
      },
      agreedToPolicy: false,
      voucherCode: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const participants = watch("participants");
  const totalPrice = pricePerPerson * participants.length;

  const handleParticipantToggle = (index: number) => {
    setParticipantForms((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleParticipantsChange = (newCount: number) => {
    const currentCount = participants.length;

    if (newCount > currentCount) {
      // Add new participants
      for (let i = currentCount; i < newCount; i++) {
        append({
          firstName: "",
          lastName: "",
          email: "",
          birthDate: "",
          gender: "",
          country: "",
          passportId: "",
          phonePrefix: "",
          phone: "",
          hearAbout: "",
          specialRequirements: "",
        });
        setParticipantForms((prev) => ({ ...prev, [i]: true }));
      }
    } else if (newCount < currentCount) {
      // Remove participants
      for (let i = currentCount - 1; i >= newCount; i--) {
        remove(i);
        setParticipantForms((prev) => {
          const newForms = { ...prev };
          delete newForms[i];
          return newForms;
        });
      }
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Booking submitted:", {
        participants: data.participants,
        billing: data.billing,
        totalPrice,
        agreedToPolicy: data.agreedToPolicy,
        voucherCode: data.voucherCode,
      });
      // Handle booking submission logic here
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error submitting booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const getFieldError = (fieldPath: string) => {
    const pathParts = fieldPath.split(".");
    let error: any = errors;

    for (const part of pathParts) {
      if (error && error[part]) {
        error = error[part];
      } else {
        return null;
      }
    }

    return error?.message || null;
  };
  const handleBackToDetails = () => {
    // viết cho tôi logic để quay lại bước chi tiết
    toast.info("Đang phát triển");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative md:h-[500px] h-[400px] max-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/homePage/teambuilding7.jpg"
            alt="Người leo núi đá gần thác nước"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 to-black/70"></div>

        <div className="relative flex items-center justify-center h-full">
          <div className="container">
            <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
              BOOKING INFORMATION
            </h1>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="bg-gray-50 xl:py-[68px] md:py-12 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-4 xl:mb-8 md:mb-6">
            <ButtonPhu
              name="Quay lại"
              icon={<ArrowLeftIcon color="white" />}
              onClick={handleBackToDetails}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 xl:gap-x-8 lg:gap-x-[22px] max-lg:gap-y-6 max-md:gap-y-4">
              {/* Left Column - Forms */}
              <div className="px-4 py-5 space-y-4 bg-white lg:col-span-7 col-span-full xl:py-10 md:py-7 xl:px-8 md:px-6 xl:space-y-8 md:space-y-6 relative z-[21]">
                {/* Step 1 - Booking Details */}
                <div>
                  <div className="mb-4 xl:mb-8 md:mb-6">
                    <div className="text-primary tracking-[1.4px] xl:mb-4 md:mb-3 mb-2 text-sm uppercase">
                      Step 1 <span>of</span> 2
                    </div>
                    <h2 className="font-bold text-2xl xl:text-3xl text-gray-900">
                      BOOKING DETAILS
                    </h2>
                  </div>

                  <div className="pb-2 mb-2 font-medium text-gray-900 border-b border-gray-100 text-lg">
                    Do Quyen Waterfall Zipline Experience
                  </div>

                  <div className="flex items-center justify-center mb-2 space-x-4 xl:mb-4 md:mb-3 xl:space-x-8 md:space-x-6">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="text-sm tracking-[0.28px] text-gray-900">Start date</div>
                      <div className="font-medium text-gray-900 text-base">October 25, 2025</div>
                    </div>

                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        viewBox="0 0 33 33"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_690_16690)">
                          <path
                            d="M31.3401 11.9225C31.2848 10.2084 31.6718 7.60964 30.7871 6.00615C30.5106 5.45323 30.0683 5.06618 29.5154 4.78972C29.239 2.7439 28.299 0.642779 26.032 0.587487C25.3684 0.587487 25.2025 1.58275 25.8661 1.74863C27.0825 1.9698 27.6355 3.07565 27.8565 4.23679C26.4741 3.96033 24.8707 3.90504 23.4331 3.96033C22.9908 2.35685 21.9955 1.02983 20.2814 0.919242C19.6179 0.863949 19.5074 1.85921 20.1155 2.02509C20.8343 2.24626 21.4425 3.07565 21.8297 4.01562C21.3319 4.01562 20.8898 4.07092 20.5026 4.07092C19.2862 4.07092 18.1252 4.01562 16.9086 4.01562C16.4663 1.91451 14.697 -0.739534 12.4853 1.14041C12.043 1.52746 12.596 2.08038 13.0935 1.91451C14.4759 1.30629 15.1394 2.85448 15.3051 4.01562C13.204 4.01562 11.1029 4.07092 9.0018 4.12621C8.78063 3.40741 8.44887 2.6886 7.95124 2.19097C7.39832 1.58275 6.23717 0.863949 5.46308 1.58275C5.2972 1.74863 5.2972 2.02509 5.46308 2.19097C5.51837 2.24626 5.57366 2.30155 5.68425 2.30155C6.67951 2.30155 7.12186 3.29682 7.34303 4.1815C5.96071 4.23679 4.63369 4.34738 3.25138 4.45796C2.64316 4.51326 2.42199 5.17677 2.69845 5.56381C1.92436 10.706 2.09024 16.0694 1.86907 21.2116C1.75848 23.9209 0.707923 29.5608 3.47255 31.3853C4.91015 32.3253 7.12185 32.0489 8.72534 32.1041C11.6558 32.1594 14.5863 32.2148 17.5168 32.2701C20.2815 32.3253 23.1014 32.5467 25.866 32.4912C27.0825 32.436 28.4648 32.3253 29.4599 31.5513C30.4553 30.7773 30.6764 29.7266 30.8975 28.5102C31.2845 25.8562 31.2293 23.0362 31.2845 20.3822C31.4506 17.5623 31.4507 14.7424 31.3401 11.9225ZM29.9577 23.5338C29.9025 25.6902 30.2342 28.3994 28.7412 30.003C27.2484 31.6617 25.1473 31.2194 23.1013 31.2194C21.1109 31.2194 19.0649 31.1642 17.0744 31.1642C15.084 31.109 13.0382 31.109 11.0475 31.0536C8.72525 30.9984 6.56884 31.3853 4.6336 30.1137C3.03012 29.0631 3.08541 28.5102 2.97483 26.6302C2.91953 25.5796 2.91953 24.4738 2.97483 23.4232C3.03012 21.488 3.1407 19.5527 3.196 17.6175C3.36187 13.747 3.74892 9.76595 3.47246 5.89539C4.91006 5.8401 6.29238 5.7848 7.72998 5.72951C7.72998 5.8401 7.72998 5.95068 7.72998 6.06127C7.72998 6.44831 7.45352 7.72004 6.79001 7.05653C6.45825 6.66948 5.73945 6.83536 5.62887 7.38829C5.3524 8.60472 6.45825 9.37882 7.6194 9.10235C8.94642 8.7706 9.49934 7.33299 9.44405 6.11656C9.44405 5.95068 9.44405 5.8401 9.38876 5.67422C11.4346 5.61893 13.4251 5.50834 15.4708 5.45305C15.4156 6.39302 15.1391 7.60946 14.0332 7.16712C13.3697 6.89065 12.9827 7.72004 13.2039 8.27297C13.7015 9.32352 15.0838 9.32352 15.9132 8.66001C16.7979 7.94121 17.0742 6.61419 17.0742 5.45305C18.7885 5.45305 20.5024 5.45305 22.2164 5.50834C22.3823 6.89065 21.94 8.16238 20.6683 8.10709C20.3365 8.10709 20.0047 8.43884 20.0047 8.7706C20.0047 8.82589 20.0047 8.93648 20.0047 8.99177C20.0047 9.43411 20.2812 9.65528 20.6683 9.82116C22.7142 10.6505 23.8752 8.10709 23.7093 5.50834C24.8152 5.56363 25.9209 5.61893 26.9715 5.67422C27.3585 5.72951 27.7455 5.7848 28.0221 5.89539C28.0221 6.06127 28.0221 6.22714 28.0221 6.39302C28.0221 7.11182 28.1327 9.71057 26.9715 9.26823C26.5292 9.10235 26.142 9.54469 26.0868 9.93174C26.0868 10.0423 26.0868 10.0976 26.0316 10.2082C25.9763 10.4847 26.2527 10.8164 26.474 10.9823C28.741 12.4752 29.4046 9.4894 29.5703 7.72004C30.0127 8.99177 29.9021 10.6505 29.9574 12.0329C30.0125 13.8022 30.0125 15.5716 30.0125 17.2857C30.1236 19.3317 30.0683 21.4327 29.9577 23.5338Z"
                            fill="#333333"
                          />
                          <path
                            d="M27.4684 13.8024C27.7449 13.5812 27.6343 13.0283 27.1918 12.973C20.7226 12.4201 13.811 12.9177 7.34176 13.5812C7.12059 13.4153 6.67825 13.5259 6.62296 13.913C6.01474 18.3364 6.01474 22.815 5.73828 27.2937C5.73828 27.6255 6.01474 27.8466 6.3465 27.9019C9.9958 28.0677 13.6451 28.2336 17.2944 28.3995C18.9532 28.4548 20.5567 28.5654 22.2155 28.6207C23.266 28.6759 25.3672 29.1736 26.4178 28.7313C27.8554 28.1783 27.4131 26.4643 27.4131 25.1373C27.4684 21.4327 27.4684 17.7834 27.5237 14.0788C27.5236 13.9682 27.5236 13.8578 27.4684 13.8024ZM26.1967 26.2434C26.5284 27.3491 26.1414 27.7362 24.9803 27.515C24.2615 27.4598 23.5427 27.4598 22.7686 27.4044C17.5158 27.1832 12.2631 26.9621 7.01028 26.7408C7.23145 22.6492 7.6185 18.4468 7.50791 14.3553C13.756 14.1894 20.1146 14.3 26.3074 13.9682C26.3074 14.0235 26.3074 14.0235 26.3074 14.0788C26.2522 17.0093 26.2522 19.9951 26.1968 22.9255C26.1967 23.8657 26.4178 25.3032 26.1967 26.2434Z"
                            fill="#333333"
                          />
                          <path
                            d="M20.3372 17.6728C18.9548 16.4564 17.2961 18.5575 16.3562 20.3269C15.9138 19.6081 15.4715 18.8894 14.8634 18.4468C14.1998 17.894 13.0387 17.728 12.5411 18.6128C11.3799 20.6032 15.0293 22.7044 16.4116 23.2573C16.5774 23.3126 16.7432 23.3126 16.8539 23.2573C17.0199 23.2573 17.2409 23.2573 17.462 23.0914C18.6784 22.2622 22.2724 19.4422 20.3372 17.6728Z"
                            fill="#333333"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_690_16690">
                            <rect
                              width="32.0001"
                              height="32"
                              fill="white"
                              transform="translate(0.5 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <div className="text-sm tracking-[0.28px] text-gray-900">End date</div>
                      <div className="font-medium text-gray-900 text-base">October 25, 2025</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowPaxInput(!showPaxInput)}
                      className="text-sm font-medium tracking-[0.32px] text-primary hover:text-primary-darker duration-150 cursor-pointer"
                    >
                      Edit Booking
                    </button>
                  </div>

                  {/* Pax Input Section */}
                  <div
                    className={`p-4 mt-2 rounded-lg xl:p-6 md:p-5 bg-gray-50 xl:mt-4 md:mt-3 transition-all duration-300 ${showPaxInput ? "block" : "hidden"}`}
                  >
                    <div className="border-b border-gray-200 pb-3.5 flex justify-between items-center">
                      <div className="text-sm font-medium tracking-[0.32px] text-gray-900">
                        VND {formatPrice(pricePerPerson)}/pax
                      </div>
                      <div className="w-16">
                        <select
                          value={participants.length}
                          onChange={(e) => handleParticipantsChange(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          disabled={isSubmitting}
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="pt-3.5">
                      <button
                        type="button"
                        onClick={() => setShowPaxInput(false)}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-darker transition-colors"
                        disabled={isSubmitting}
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  {/* Participant Forms */}
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="my-4 border border-gray-200 rounded-lg xl:my-8 md:my-6"
                    >
                      <div
                        className="flex items-center justify-between px-4 py-3 overflow-hidden rounded-t-lg cursor-pointer xl:px-6 md:px-5 bg-gray-50"
                        onClick={() => handleParticipantToggle(index)}
                      >
                        <div className="font-medium text-gray-900 text-base">
                          Participant {index + 1}
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="10"
                          viewBox="0 0 16 10"
                          fill="none"
                          className={`duration-150 transition-transform ${participantForms[index] ? "rotate-180" : ""}`}
                        >
                          <path
                            d="M15.1657 0.920372C10.6797 0.623372 6.19372 0.537373 1.70772 0.530373C0.862718 0.500373 0.383718 1.62637 1.01172 2.21137C3.24272 4.53637 5.63372 6.95437 7.93072 9.19837C8.28672 9.56037 8.87172 9.56037 9.22672 9.19837C11.3397 7.04937 13.4127 4.86137 15.4197 2.60637C15.7267 2.27337 15.7987 1.96637 15.7217 1.77437C16.2037 1.51237 16.0837 0.989372 15.1657 0.920372ZM8.62872 7.26737C7.12772 5.66737 5.56872 4.03937 4.01372 2.45137C7.55772 2.37137 11.1007 2.22737 14.6447 1.95537C12.5917 3.67937 10.5967 5.45937 8.62872 7.26737Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      {participantForms[index] && (
                        <div className="p-4 space-y-4 xl:p-6 md:p-5">
                          {/* Name Fields */}
                          <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-8 md:gap-x-[22px] max-md:gap-y-6">
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                First Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                {...form.register(`participants.${index}.firstName`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.firstName`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Enter First Name"
                                disabled={isSubmitting}
                              />
                              {getFieldError(`participants.${index}.firstName`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.firstName`)}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                Last Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                {...form.register(`participants.${index}.lastName`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.lastName`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Enter Last Name"
                                disabled={isSubmitting}
                              />
                              {getFieldError(`participants.${index}.lastName`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.lastName`)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Email and Birthday */}
                          <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-8 md:gap-x-[22px] max-md:gap-y-6">
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                Email <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                {...form.register(`participants.${index}.email`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.email`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Enter Email"
                                disabled={isSubmitting}
                              />
                              {getFieldError(`participants.${index}.email`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.email`)}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                Birthday <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                {...form.register(`participants.${index}.birthDate`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.birthDate`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                disabled={isSubmitting}
                              />
                              {getFieldError(`participants.${index}.birthDate`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.birthDate`)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Gender and Country */}
                          <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-8 md:gap-x-[22px] max-md:gap-y-6">
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                Gender <span className="text-red-500">*</span>
                              </label>
                              <select
                                {...form.register(`participants.${index}.gender`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.gender`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                disabled={isSubmitting}
                              >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Prefer not to be specified">
                                  Prefer not to be specified
                                </option>
                              </select>
                              {getFieldError(`participants.${index}.gender`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.gender`)}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block mb-1 text-sm text-gray-900">
                                Country <span className="text-red-500">*</span>
                              </label>
                              <select
                                {...form.register(`participants.${index}.country`)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.country`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                disabled={isSubmitting}
                              >
                                <option value="">Select</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Australia">Australia</option>
                                <option value="Canada">Canada</option>
                              </select>
                              {getFieldError(`participants.${index}.country`) && (
                                <p className="mt-1 text-sm text-red-500">
                                  {getFieldError(`participants.${index}.country`)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Passport/ID */}
                          <div>
                            <label className="block mb-1 text-sm text-gray-900">
                              Passport No./Citizen ID No. <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...form.register(`participants.${index}.passportId`)}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                getFieldError(`participants.${index}.passportId`)
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter Passport Number/Citizen ID Number"
                              disabled={isSubmitting}
                            />
                            {getFieldError(`participants.${index}.passportId`) && (
                              <p className="mt-1 text-sm text-red-500">
                                {getFieldError(`participants.${index}.passportId`)}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="block mb-1 text-sm text-gray-900">
                              Mobile Phone <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-1">
                              <select
                                {...form.register(`participants.${index}.phonePrefix`)}
                                className={`w-[124px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.phonePrefix`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                disabled={isSubmitting}
                              >
                                <option value="">Select</option>
                                <option value="+84">VN (+84)</option>
                                <option value="+1">US (+1)</option>
                                <option value="+44">UK (+44)</option>
                              </select>
                              <input
                                type="tel"
                                {...form.register(`participants.${index}.phone`)}
                                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                  getFieldError(`participants.${index}.phone`)
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                                placeholder="Enter Mobile Phone"
                                disabled={isSubmitting}
                              />
                            </div>
                            {(getFieldError(`participants.${index}.phonePrefix`) ||
                              getFieldError(`participants.${index}.phone`)) && (
                              <p className="mt-1 text-sm text-red-500">
                                {getFieldError(`participants.${index}.phonePrefix`) ||
                                  getFieldError(`participants.${index}.phone`)}
                              </p>
                            )}
                          </div>

                          {/* How did you hear about us */}
                          <div>
                            <label className="block mb-1 text-sm text-gray-900">
                              How did you hear about us? <span className="text-red-500">*</span>
                            </label>
                            <select
                              {...form.register(`participants.${index}.hearAbout`)}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                getFieldError(`participants.${index}.hearAbout`)
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              disabled={isSubmitting}
                            >
                              <option value="">Select</option>
                              <option value="Internet Search">Internet Search</option>
                              <option value="Friend">Friend</option>
                              <option value="Social Media">Social Media</option>
                              <option value="Travel Agent">Travel Agent</option>
                              <option value="Other">Other</option>
                            </select>
                            {getFieldError(`participants.${index}.hearAbout`) && (
                              <p className="mt-1 text-sm text-red-500">
                                {getFieldError(`participants.${index}.hearAbout`)}
                              </p>
                            )}
                          </div>

                          {/* Special Requirements */}
                          <div>
                            <label className="block mb-1 text-sm text-gray-900">
                              Special Requirements
                            </label>
                            <textarea
                              rows={5}
                              {...form.register(`participants.${index}.specialRequirements`)}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                                getFieldError(`participants.${index}.specialRequirements`)
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Enter Special Requirements"
                              disabled={isSubmitting}
                            />
                            {getFieldError(`participants.${index}.specialRequirements`) && (
                              <p className="mt-1 text-sm text-red-500">
                                {getFieldError(`participants.${index}.specialRequirements`)}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {watch(`participants.${index}.specialRequirements`)?.length || 0}/500
                              ký tự
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 2 - Billing & Contact */}
                <div className="space-y-4 xl:space-y-8 md:space-y-6">
                  <div>
                    <div className="text-primary tracking-[1.4px] xl:mb-4 md:mb-3 mb-2 text-sm uppercase">
                      Step 2 <span>of</span> 2
                    </div>
                    <h2 className="font-bold text-2xl xl:text-3xl text-gray-900">
                      BILLING & CONTACT
                    </h2>
                  </div>

                  <div className="relative border border-gray-200 rounded-lg">
                    <div className="px-4 py-3 overflow-hidden font-medium text-gray-900 rounded-t-lg xl:px-6 md:px-5 bg-gray-50 text-base">
                      Confirmation and Billing Statements
                    </div>

                    <div className="p-4 space-y-4 xl:p-6 md:p-5">
                      {/* Billing Name */}
                      <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-x-8 md:gap-x-[22px] max-md:gap-y-6">
                        <div>
                          <label className="block mb-1 text-sm text-gray-900">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            {...form.register("billing.firstName")}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              getFieldError("billing.firstName")
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter First Name"
                            disabled={isSubmitting}
                          />
                          {getFieldError("billing.firstName") && (
                            <p className="mt-1 text-sm text-red-500">
                              {getFieldError("billing.firstName")}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block mb-1 text-sm text-gray-900">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            {...form.register("billing.lastName")}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              getFieldError("billing.lastName")
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter Last Name"
                            disabled={isSubmitting}
                          />
                          {getFieldError("billing.lastName") && (
                            <p className="mt-1 text-sm text-red-500">
                              {getFieldError("billing.lastName")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Billing Email */}
                      <div>
                        <label className="block mb-1 text-sm text-gray-900">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          {...form.register("billing.email")}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            getFieldError("billing.email") ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter Email"
                          disabled={isSubmitting}
                        />
                        {getFieldError("billing.email") && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("billing.email")}
                          </p>
                        )}
                      </div>

                      {/* Billing Phone */}
                      <div>
                        <label className="block mb-1 text-sm text-gray-900">
                          Mobile Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-1">
                          <select
                            {...form.register("billing.phonePrefix")}
                            className={`w-[124px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              getFieldError("billing.phonePrefix")
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            disabled={isSubmitting}
                          >
                            <option value="">Select</option>
                            <option value="+84">VN (+84)</option>
                            <option value="+1">US (+1)</option>
                            <option value="+44">UK (+44)</option>
                          </select>
                          <input
                            type="tel"
                            {...form.register("billing.phone")}
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                              getFieldError("billing.phone") ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Enter Mobile Phone"
                            disabled={isSubmitting}
                          />
                        </div>
                        {(getFieldError("billing.phonePrefix") ||
                          getFieldError("billing.phone")) && (
                          <p className="mt-1 text-sm text-red-500">
                            {getFieldError("billing.phonePrefix") || getFieldError("billing.phone")}
                          </p>
                        )}
                      </div>

                      {/* Agreement Checkbox */}
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="agreement"
                          {...form.register("agreedToPolicy")}
                          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                          disabled={isSubmitting}
                        />
                        <label htmlFor="agreement" className="text-sm text-gray-900">
                          By submitting this order you confirm that you agree to our{" "}
                          <span className="font-medium text-gray-900 underline cursor-pointer">
                            Booking Policy
                          </span>
                        </label>
                      </div>
                      {getFieldError("agreedToPolicy") && (
                        <p className="mt-1 text-sm text-red-500">
                          {getFieldError("agreedToPolicy")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Booking Button */}
                  <div className="relative z-0 max-lg:hidden">
                    <ButtonTour
                      name={`${isSubmitting ? "Booking..." : "Booking now"}`}
                      className="bg-white"
                      type="submit"
                      fullWidth
                      maxWidth="max-w-[600px] !h-[40px]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Summary */}
              <div className="lg:col-span-5 col-span-full">
                <div className="lg:sticky lg:top-[100px]">
                  <div className="p-4 bg-white xl:p-6 md:p-5 rounded-lg shadow-sm">
                    {/* Tour Title and Price */}
                    <div className="flex justify-between pb-2 space-x-4 border-b border-gray-100 xl:pb-4 md:pb-3">
                      <div className="font-medium text-gray-900 text-base">
                        Do Quyen Waterfall Zipline Experience
                      </div>
                      <div className="font-medium text-gray-900 text-base max-md:hidden">
                        VND {formatPrice(pricePerPerson)}/pax
                      </div>
                    </div>

                    {/* Date Information */}
                    <div className="xl:py-4 md:py-3 py-2 flex items-center justify-center xl:space-x-8 md:space-x-[22px] space-x-4 border-b border-dashed border-gray-100">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="text-sm tracking-[0.28px] text-gray-900">Start date</div>
                        <div className="font-medium text-gray-900 text-base">October 25, 2025</div>
                      </div>

                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_690_16690)">
                            <path
                              d="M31.3401 11.9225C31.2848 10.2084 31.6718 7.60964 30.7871 6.00615C30.5106 5.45323 30.0683 5.06618 29.5154 4.78972C29.239 2.7439 28.299 0.642779 26.032 0.587487C25.3684 0.587487 25.2025 1.58275 25.8661 1.74863C27.0825 1.9698 27.6355 3.07565 27.8565 4.23679C26.4741 3.96033 24.8707 3.90504 23.4331 3.96033C22.9908 2.35685 21.9955 1.02983 20.2814 0.919242C19.6179 0.863949 19.5074 1.85921 20.1155 2.02509C20.8343 2.24626 21.4425 3.07565 21.8297 4.01562C21.3319 4.01562 20.8898 4.07092 20.5026 4.07092C19.2862 4.07092 18.1252 4.01562 16.9086 4.01562C16.4663 1.91451 14.697 -0.739534 12.4853 1.14041C12.043 1.52746 12.596 2.08038 13.0935 1.91451C14.4759 1.30629 15.1394 2.85448 15.3051 4.01562C13.204 4.01562 11.1029 4.07092 9.0018 4.12621C8.78063 3.40741 8.44887 2.6886 7.95124 2.19097C7.39832 1.58275 6.23717 0.863949 5.46308 1.58275C5.2972 1.74863 5.2972 2.02509 5.46308 2.19097C5.51837 2.24626 5.57366 2.30155 5.68425 2.30155C6.67951 2.30155 7.12186 3.29682 7.34303 4.1815C5.96071 4.23679 4.63369 4.34738 3.25138 4.45796C2.64316 4.51326 2.42199 5.17677 2.69845 5.56381C1.92436 10.706 2.09024 16.0694 1.86907 21.2116C1.75848 23.9209 0.707923 29.5608 3.47255 31.3853C4.91015 32.3253 7.12185 32.0489 8.72534 32.1041C11.6558 32.1594 14.5863 32.2148 17.5168 32.2701C20.2815 32.3253 23.1014 32.5467 25.866 32.4912C27.0825 32.436 28.4648 32.3253 29.4599 31.5513C30.4553 30.7773 30.6764 29.7266 30.8975 28.5102C31.2845 25.8562 31.2293 23.0362 31.2845 20.3822C31.4506 17.5623 31.4507 14.7424 31.3401 11.9225ZM29.9577 23.5338C29.9025 25.6902 30.2342 28.3994 28.7412 30.003C27.2484 31.6617 25.1473 31.2194 23.1013 31.2194C21.1109 31.2194 19.0649 31.1642 17.0744 31.1642C15.084 31.109 13.0382 31.109 11.0475 31.0536C8.72525 30.9984 6.56884 31.3853 4.6336 30.1137C3.03012 29.0631 3.08541 28.5102 2.97483 26.6302C2.91953 25.5796 2.91953 24.4738 2.97483 23.4232C3.03012 21.488 3.1407 19.5527 3.196 17.6175C3.36187 13.747 3.74892 9.76595 3.47246 5.89539C4.91006 5.8401 6.29238 5.7848 7.72998 5.72951C7.72998 5.8401 7.72998 5.95068 7.72998 6.06127C7.72998 6.44831 7.45352 7.72004 6.79001 7.05653C6.45825 6.66948 5.73945 6.83536 5.62887 7.38829C5.3524 8.60472 6.45825 9.37882 7.6194 9.10235C8.94642 8.7706 9.49934 7.33299 9.44405 6.11656C9.44405 5.95068 9.44405 5.8401 9.38876 5.67422C11.4346 5.61893 13.4251 5.50834 15.4708 5.45305C15.4156 6.39302 15.1391 7.60946 14.0332 7.16712C13.3697 6.89065 12.9827 7.72004 13.2039 8.27297C13.7015 9.32352 15.0838 9.32352 15.9132 8.66001C16.7979 7.94121 17.0742 6.61419 17.0742 5.45305C18.7885 5.45305 20.5024 5.45305 22.2164 5.50834C22.3823 6.89065 21.94 8.16238 20.6683 8.10709C20.3365 8.10709 20.0047 8.43884 20.0047 8.7706C20.0047 8.82589 20.0047 8.93648 20.0047 8.99177C20.0047 9.43411 20.2812 9.65528 20.6683 9.82116C22.7142 10.6505 23.8752 8.10709 23.7093 5.50834C24.8152 5.56363 25.9209 5.61893 26.9715 5.67422C27.3585 5.72951 27.7455 5.7848 28.0221 5.89539C28.0221 6.06127 28.0221 6.22714 28.0221 6.39302C28.0221 7.11182 28.1327 9.71057 26.9715 9.26823C26.5292 9.10235 26.142 9.54469 26.0868 9.93174C26.0868 10.0423 26.0868 10.0976 26.0316 10.2082C25.9763 10.4847 26.2527 10.8164 26.474 10.9823C28.741 12.4752 29.4046 9.4894 29.5703 7.72004C30.0127 8.99177 29.9021 10.6505 29.9574 12.0329C30.0125 13.8022 30.0125 15.5716 30.0125 17.2857C30.1236 19.3317 30.0683 21.4327 29.9577 23.5338Z"
                              fill="#333333"
                            />
                            <path
                              d="M27.4684 13.8024C27.7449 13.5812 27.6343 13.0283 27.1918 12.973C20.7226 12.4201 13.811 12.9177 7.34176 13.5812C7.12059 13.4153 6.67825 13.5259 6.62296 13.913C6.01474 18.3364 6.01474 22.815 5.73828 27.2937C5.73828 27.6255 6.01474 27.8466 6.3465 27.9019C9.9958 28.0677 13.6451 28.2336 17.2944 28.3995C18.9532 28.4548 20.5567 28.5654 22.2155 28.6207C23.266 28.6759 25.3672 29.1736 26.4178 28.7313C27.8554 28.1783 27.4131 26.4643 27.4131 25.1373C27.4684 21.4327 27.4684 17.7834 27.5237 14.0788C27.5236 13.9682 27.5236 13.8578 27.4684 13.8024ZM26.1967 26.2434C26.5284 27.3491 26.1414 27.7362 24.9803 27.515C24.2615 27.4598 23.5427 27.4598 22.7686 27.4044C17.5158 27.1832 12.2631 26.9621 7.01028 26.7408C7.23145 22.6492 7.6185 18.4468 7.50791 14.3553C13.756 14.1894 20.1146 14.3 26.3074 13.9682C26.3074 14.0235 26.3074 14.0235 26.3074 14.0788C26.2522 17.0093 26.2522 19.9951 26.1968 22.9255C26.1967 23.8657 26.4178 25.3032 26.1967 26.2434Z"
                              fill="#333333"
                            />
                            <path
                              d="M20.3372 17.6728C18.9548 16.4564 17.2961 18.5575 16.3562 20.3269C15.9138 19.6081 15.4715 18.8894 14.8634 18.4468C14.1998 17.894 13.0387 17.728 12.5411 18.6128C11.3799 20.6032 15.0293 22.7044 16.4116 23.2573C16.5774 23.3126 16.7432 23.3126 16.8539 23.2573C17.0199 23.2573 17.2409 23.2573 17.462 23.0914C18.6784 22.2622 22.2724 19.4422 20.3372 17.6728Z"
                              fill="#333333"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_690_16690">
                              <rect
                                width="32.0001"
                                height="32"
                                fill="white"
                                transform="translate(0.5 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <div className="text-sm tracking-[0.28px] text-gray-900">End date</div>
                        <div className="font-medium text-gray-900 text-base">October 25, 2025</div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="flex justify-between xl:pb-[19px] md:pb-3.5 pb-2.5 border-b border-gray-100 xl:pt-4 md:pt-3 pt-2">
                      <div className="text-gray-900 text-sm w-[145px]">
                        VND {formatPrice(pricePerPerson)}/pax
                      </div>
                      <div className="flex-shrink-0 w-8 text-gray-900 text-sm font-medium">
                        x {participants.length.toString().padStart(2, "0")}
                      </div>
                      <div className="text-gray-900 text-sm font-medium w-[124px] flex-shrink-0 text-right">
                        VND {formatPrice(totalPrice)}
                      </div>
                    </div>

                    {/* Voucher Section */}
                    <div className="xl:pt-[19px] md:pt-3.5 pt-2.5">
                      <ButtonPhu
                        name="Add vouche"
                        className="bg-white"
                        onClick={() => setShowVoucherForm(!showVoucherForm)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div
                      className={`duration-300 transition-all ${showVoucherForm ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"}`}
                    >
                      <div className="mb-2 xl:mb-4 md:mb-3">
                        <input
                          type="text"
                          {...form.register("voucherCode")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter Voucher, Coupon or Promo Code"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-darker transition-colors text-sm"
                          disabled={isSubmitting}
                        >
                          Apply voucher
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Section */}
                  <div className="p-4 xl:p-6 md:p-5 bg-[#34430F] text-white">
                    <div className="flex justify-between xl:pb-[19px] md:pb-3.5 pb-2.5 border-b border-gray-600">
                      <div className="flex-shrink-0">
                        <div className="mb-1 font-medium text-white text-base">Subtotal</div>
                        <div className="text-sm tracking-[0.28px] text-white">
                          Includes taxes & fees
                        </div>
                      </div>
                      <div className="font-medium text-white text-base">
                        VND {formatPrice(totalPrice)}
                      </div>
                    </div>

                    <div className="xl:pt-[19px] md:pt-3.5 pt-2.5 flex justify-between">
                      <div className="flex-shrink-0 font-medium text-white text-base">
                        Total (VND)
                      </div>
                      <div className="font-medium text-base text-yellow-400">
                        VND {formatPrice(totalPrice)}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Booking Button */}
                  <div className="flex justify-center p-4 bg-white lg:hidden md:p-5">
                    <ButtonTour
                      name={`${isSubmitting ? "Booking..." : "Booking now"}`}
                      className="bg-white"
                      type="submit"
                      fullWidth
                      maxWidth="max-w-[600px] !h-[40px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
