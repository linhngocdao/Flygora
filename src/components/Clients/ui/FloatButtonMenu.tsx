"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

interface FloatAction {
  id: string;
  icon: any;
  label: string;
  action: () => void;
}

const FloatButtonMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const floatActions: FloatAction[] = [
    {
      id: "phone",
      label: "Call us",
      action: () => {
        window.open("tel:+84793946789", "_self");
        closeMenu();
      },
      icon: (
        <Image
          src="/images/homePage/phone.png"
          alt="Phone Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      action: () => {
        window.open("https://wa.me/84793946789", "_blank");
        closeMenu();
      },
      icon: (
        <Image
          src="/images/homePage/whatsapp.svg"
          alt="WhatsApp Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "zalo",
      label: "Zalo",
      action: () => {
        window.open("https://zalo.me/84793946789", "_blank");
        closeMenu();
      },
      icon: (
        <Image
          src="/images/homePage/zalo.svg"
          alt="Zalo Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ),
    },
    {
      id: "email",
      label: "Email",
      action: () => {
        window.open("mailto:advisor@flygora.com", "_self");
        closeMenu();
      },
      icon: (
        <Image
          src="/images/homePage/email.png"
          alt="Email Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ),
    },
  ];

  return (
    <div className="fixed bottom-18 right-6 md:right-12 md:bottom-22 z-[998]">
      <div className="mb-4 space-y-3 transition-all duration-300 ease-out ">
        {floatActions.map((action, index) => (
          <div
            key={action.id}
            className={` transition-all duration-300 ease-out ${
              isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
            }`}
            style={{
              transitionDelay: isOpen
                ? `${index * 50}ms`
                : `${(floatActions.length - index - 1) * 50}ms`,
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            <button
              onClick={action.action}
              className="bg-img cursor-pointer
                group flex items-center justify-center
                w-12 h-12 md:w-14 md:h-14
                text-white rounded-full
                shadow-lg hover:shadow-xl
                transition-all duration-300 ease-in-out
                hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                backdrop-blur-sm"
              title={action.label}
              aria-label={action.label}
            >
              {action.icon}

              <div className="absolute right-full mr-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none ">
                {action.label}
              </div>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={toggleMenu}
        className="bg-img  relative flex justify-center items-center w-12 h-12 md:w-[60px] md:h-[60px] rounded-full cursor-pointer"
      >
        {isOpen ? (
          <Image
            src="/images/homePage/closeContact.svg"
            alt="Close Contact Icon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        ) : (
          <Image
            src="/images/homePage/userContact.svg"
            alt="User Contact Icon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
      </button>
    </div>
  );
};

export default FloatButtonMenu;
