import { FaSquareXTwitter } from "react-icons/fa6";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | string; // predefined sizes or custom value
  textScale?: number; // multiplier for text size relative to icon
}

export const Logo = ({ size = 'md', textScale = 1.25 }: LogoProps) => {
  // Define size mappings (icon sizes)
  const sizeMap = {
    sm: '1.5rem',
    md: '2rem',
    lg: '3.5rem',
    xl: '7rem'
  };

  // Get the actual icon size
  const iconSize = size in sizeMap 
    ? sizeMap[size as keyof typeof sizeMap] 
    : size;

  // Calculate text size based on icon size and scale factor
  const textSize = `calc(${iconSize} * (${textScale}/2))`;

  return (
    <div className='flex justify-center items-center gap-2 pl-2'>
      <FaSquareXTwitter 
        className='text-primary skew-x-3' 
        style={{ 
          width: iconSize, 
          height: iconSize 
        }}
      />
      <h1 
        className='font-medium text-pretty font-geist-800 text-primary skew-x-2 hover:skew-x-0 transition-all'
        style={{ fontSize: textSize }}
      >
        Tweetmash
      </h1>
    </div>
  );
};