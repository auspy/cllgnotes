import { atom } from "recoil";

export const atomFilter = atom({
  key: "filter",
  default: {},
});

// export const atomFilterFunctions = selector({
//   key: "filterFunctions",
//   get: ({ get }) => {
//     const filtr = get(atomFilter);
//     return {
//       clearFilters: () => handleFilterActions("clearFilters",filtr,()=>{}),
//       removeAFilter: (chip: FilterChipProps) => handleFilterActions("removeAFilter",filtr,()=>{},chip),
//       addFilter: (chip: FilterChipProps, change: boolean = false) => handleFilterActions("addFilter",filtr,()=>{},chip,change),
//     };
//   },
//   set: ({ set, get },newValue) => {
//     const filtr = get(atomFilter);
//     const setFiltr = (value: any) => set(atomFilter, value);
//     handleFilterActions(newValue,filtr,setFiltr,newValue.chip,newValue.change)
//   },
// });
// function handleFilterActions(actionType: string,filtr:any,setFiltr:any, chip: FilterChipProps, change: boolean = false) {
//   switch (actionType) {
//     case 'clearFilters':
//       setFiltr({});
//       break;
//     case 'removeAFilter':
//       const obj = { ...filtr };
//       delete obj[chip.key];
//       set(atomFilter, obj);
//       break;
//     case 'addFilter':
//       if (chip.key in filtr) {
//         setFiltr((prev) => {
//           const obj = { ...prev };
//           delete obj[chip.key];
//           return obj;
//         });
//         if (!change) return;
//       }
//       setFiltr((prev) => {
//         return { ...prev, [chip.key]: chip.label };
//       });
//       break;
//     default:
//       throw new Error(`Unhandled action type: ${actionType}`);
//   }
// }
