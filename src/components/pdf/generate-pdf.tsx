// components/PDFPreview.jsx
import React from "react";
import { pdf } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import { calculateAll, type State } from "@src/helpers"

export async function generatePdf(state: State, userName: string, chartImage: any) {
  const blob = await pdf(
    <PDFDocument
       name={userName} 
       GraphImage={chartImage}
       {...calculateAll(state)}
      />
  ).toBlob();

  return blob;
}
