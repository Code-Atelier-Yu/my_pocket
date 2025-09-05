import Image from "next/image";

type CardImageProps = {
  thumbnail: string | null;
};

function CardImage({thumbnail}: CardImageProps) {
  return (
    <div className="relative w-full h-full">
      {thumbnail ? (
        <Image
          className="object-cover md:object-contain object-center md:object-top"
          src={thumbnail}
          alt="サムネイル画像"
          fill={true}
          priority
          sizes="300px"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400">画像なし</span>
        </div>
      )}
    </div>
  );
}

export default CardImage;
