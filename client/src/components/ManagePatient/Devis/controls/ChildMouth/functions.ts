
export const handleSelectedTeeth = (tooth: string, selectedTeeth: any, setSelectedTeeth: any) => {
  if (selectedTeeth.includes(tooth)) {
    setSelectedTeeth(selectedTeeth.filter((t: string) => t !== tooth));
  } else {
    setSelectedTeeth([...selectedTeeth, tooth].sort((a: string, b: string) => a.localeCompare(b)));
  }
};