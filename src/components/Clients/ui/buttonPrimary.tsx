import Image from 'next/image';

interface ButtonPrimaryProps {
  name?: string;
  href?: string;
  className?: string;
}

const ButtonPrimary = ({ name, href }: ButtonPrimaryProps) => {
  return (
    <a href={href} className="block max-w-[140px]">
      <button className="relative w-full h-[48px] cursor-pointer overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/home/BackBtn.svg"
            alt="button background"
            width={200}
            height={200}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Button label */}
        <span className="relative z-10 flex items-center justify-center w-full h-full text-white font-semibold">
          {name ? name : 'No Name Provided'}
        </span>
      </button>
    </a>
  );
};

export default ButtonPrimary;
