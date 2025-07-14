import Image from 'next/image';

interface ButtonPrimaryProps {
  name?: string;
  href?: string;
  className?: string;
}

const ButtonSecondary = ({ name, href }: ButtonPrimaryProps) => {
  return (
    <a href={href} className="inline-block">
      <button className="relative px-8 h-[40px] cursor-pointer overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 ">
          <Image
            src="/images/homePage/BackBtn.svg"
            alt="button background"
            width={200}
            height={200}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full spin-animation">
          <span className="text-white font-semibold   transition-colors duration-300">
            {name ? name : 'No Name Provided'}
          </span>
        </div>
      </button>
    </a>
  );
};

export default ButtonSecondary;
