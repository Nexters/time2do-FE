import { useState } from "react";
import { cls } from "../../utils/cls";

interface Props {}

export function Face({}: Props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
      className="face relative w-[300px] h-[300px] rounded-full bg-yellow-400 flex justify-center items-center"
    >
      <div className="eyes relative -top-10 flex w-full justify-center items-center">
        <div className="eyeball relative w-[80px] h-[80px] block bg-white mx-4 rounded-full">
          <div className="eye absolute top-1/2 left-1/3 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 bg-[#333] rounded-full"></div>
        </div>
        <div className="eyeball relative w-[80px] h-[80px] block bg-white mx-4 rounded-full">
          <div className="eye absolute top-1/2 left-1/3 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 bg-[#333] rounded-full"></div>
        </div>
      </div>
      <div
        className={cls(
          "mouth absolute  w-[150px] bg-[#b57700] transition-all duration-500 hover:top-[200px] hover:h-[25px] hover:rounded-none",
          isHovering
            ? "top-[200px] h-[25px] rounded-none"
            : "top-[180px] h-[70px] rounded-b-[70px]"
        )}
      ></div>
    </div>
  );
}
