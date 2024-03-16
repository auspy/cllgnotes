"use client";
import { useDeviceType, useRecoilFilter } from "@cllgnotes/lib";
import { BottomDrawer, FilterSidebar } from "ui";
import Suggestions from "@/components/explore/suggestions/Suggestions";

const BelowHeroExplore = ({
  children,
  Filters,
}: React.PropsWithChildren & { Filters: React.ReactNode }) => {
  const device = useDeviceType();
  const { removeFilter, filters: filtr, addFilter } = useRecoilFilter();
  const isDesktop = device == "desktop";
  const filter = (maxWidth: string | number = 320) => (
    <FilterSidebar
      maxWidth={maxWidth}
      removeFilter={removeFilter}
      addFilter={addFilter}
    >
      {Filters}
    </FilterSidebar>
  );
  return (
    <>
      <div
        className="topContainer flex flex-col mt40"
        style={{ rowGap: 60, marginBottom: 100 }}
      >
        <Suggestions addFilter={addFilter} selected={Object.keys(filtr)} />
        <div className="frfs w100" style={{ gap: 30 }}>
          {!isDesktop ? (
            <BottomDrawer>{filter("unset")}</BottomDrawer>
          ) : (
            filter()
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export default BelowHeroExplore;
