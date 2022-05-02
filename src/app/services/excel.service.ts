import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  maxRowsPerSheet:number = 500000;
  itera: number = 0;
  auxJson: any = [];

  constructor() { }

  public exportAsExcelFile(json: any, excelFileName: string): void {
    //--> USAR UN SOLO LIBRO y UNA SOLA HOJA:
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json); 
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  }
  