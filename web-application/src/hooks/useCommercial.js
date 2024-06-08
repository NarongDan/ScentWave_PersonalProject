import { useContext } from "react";
import { CommercialContext } from "../features/homepage/context/CommercialContext";

export default function useCommercial() {
  return useContext(CommercialContext);
}
