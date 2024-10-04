import { FC } from "react";
import { ChartPie } from "lucide-react";

interface LogoProps {
  size: number;
  titleSize: string;
  subtitleSize: string;
  theme?: "dark" | "light" | "auto";
}

const themeClasses = {
  dark: {
    container: "text-white",
    subtitle: "text-gray-200",
  },
  light: {
    container: "text-dark",
    subtitle: "text-gray-800",
  },
  auto: {
    container: "",
    subtitle: "text-gray-700 dark:text-gray-300",
  },
};

const Logo: FC<LogoProps> = ({
  size,
  titleSize,
  subtitleSize,
  theme = "auto",
}) => {
  const { container, subtitle } = themeClasses[theme];

  return (
    <div className={`flex gap-2 items-center ${container}`}>
      <ChartPie size={size} />
      <h1 className={`text-${titleSize} font-bold text-center mt-1`}>
        NPS
        <span className={`text-${subtitleSize} font-normal ${subtitle}`}>
          metrics
        </span>
      </h1>
    </div>
  );
};

export default Logo;
