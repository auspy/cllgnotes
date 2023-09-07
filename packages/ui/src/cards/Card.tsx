export const Card = ({
  imgSrc,
  imgAlt,
  cource,
  degree,
  semester,
  subject,
  chapter
}) => {
  return (
    <>
      <div className="pl-[7px] pr-[7px] pb-[20px] pt-[7px] border border-black-500 border-solid rounded-md">

        <div className="relative pb-4">
          <img
            className="rounded-md justify-center"
            src={imgSrc}
            alt={imgAlt}
          />

          <div className="absolute bottom-[4.5px] left-[40px]">
            <div className="w-[220px] pt-1 pb-1 pl-2 pr-2 border border-black-500 border-solid rounded-md flex flex-row justify-between bg-white">
              <div className="font-medium text-sm">{cource}</div>
              <div className="font-medium text-sm">.</div>
              <div className="font-medium text-sm">{degree}</div>
              <div className="font-medium text-sm">.</div>
              <div className="font-medium text-sm">{semester}</div>
            </div>
          </div>

        </div>

        <div className="space-y-1">
          <div className="font-medium">{subject}</div>
          <div className="font-bold text-2xl">{chapter}</div>
          <div className="font-medium">SRM University</div>
        </div>
        
      </div>
    </>
  );
};
