import { Smile, Meh, Frown, LoaderCircle } from "lucide-react";

interface ClassificationProps {
  status: "Promotor" | "Neutro" | "Detrator" | "Loading";
}

const statusConfig = {
  Promotor: {
    bgColor: "bg-green-200",
    textColor: "text-green-900",
    Icon: Smile,
    spinner: false,
    label: "Promotor",
  },
  Neutro: {
    bgColor: "bg-gray-200",
    textColor: "text-gray-900",
    Icon: Meh,
    spinner: false,
    label: "Neutro",
  },
  Detrator: {
    bgColor: "bg-red-200",
    textColor: "text-red-900",
    Icon: Frown,
    spinner: false,
    label: "Detrator",
  },
  Loading: {
    bgColor: "bg-gray-200",
    textColor: "text-gray-900",
    Icon: LoaderCircle,
    spinner: true,
    label: "Carregando...",
  },
};

const StatusDisplay = ({
  status,
}: {
  status: "Promotor" | "Neutro" | "Detrator" | "Loading";
}) => {
  const { bgColor, textColor, Icon, spinner, label } = statusConfig[status];

  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} rounded-full p-5`}>
        <Icon
          size={90}
          className={`${textColor} ${spinner ? "animate-spin" : ""}`}
        />
      </div>
      <p className="mt-4 text-2xl font-bold">{label}</p>
    </div>
  );
};

export function Classification({ status }: ClassificationProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <StatusDisplay status={status} />
    </div>
  );
}
