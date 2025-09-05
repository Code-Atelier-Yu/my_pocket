import { CiClock2 } from "react-icons/ci";

type CardDateProps = {
  siteUpdatedAt: string;
};

function CardDate({ siteUpdatedAt }: CardDateProps) {
  return (
    <div className="flex items-center">
      <CiClock2 className="mr-1" />
      <span>{new Date(siteUpdatedAt).toLocaleDateString("sv-SE")}</span>
    </div>
  );
}

export default CardDate;
