"use client";

import ReactCardFlip from "react-card-flip";
import ProfileFront from "./ProfileFront";
import ProfileBack from "./ProfileBack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  flip: string;
};

export function Profile(props: Props) {
  const { flip } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFront = (flipId: number) => {
    params.set("flip", flipId.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    params.delete("flip");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 px-1 gap-4 mt-8">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <ReactCardFlip
          key={index}
          isFlipped={flip === index.toString()}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.6}
          flipSpeedFrontToBack={0.6}
          infinite={true}
        >
          <ProfileFront
            id={index}
            src={`https://source.unsplash.com/random/${index}`}
            handleClick={handleFront}
          />
          <ProfileBack
            src={`https://source.unsplash.com/random/${index + 5}`}
            handleClick={handleBack}
          />
        </ReactCardFlip>
      ))}
    </div>
  );
}
