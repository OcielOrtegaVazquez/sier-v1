import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ImagePosition, Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { LOGO } from './logo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  apiResponse: string;

  maxRowsPerSheet: number = 500000;
  itera: number = 0;
  auxJson: any = [];

  private _workbook!: Workbook;

  constructor(private http: HttpClient) { }

  public exportAsExcelFile(json: any, excelFileName: string): void {

    //--> USAR UN SOLO LIBRO y UNA SOLA HOJA:
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public downloadExcel(id) {
    this._workbook = new Workbook();
    this._workbook.creator = 'SIER';
    this.formatExcel();
    this._workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data],  { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Formato_Vacaciones.xlsx')
    });
  }


  private formatExcel() {

 const data = [ [1,'hola','Francia'] ]

    const sheet = this._workbook.addWorksheet('Formato_Vacaciones_SIER', { pageSetup: { fitToPage: true} } );
    

    /* Print Area */
    sheet.pageSetup.printArea = 'A1:AC48';
    sheet.pageSetup.margins = {
      left: 0.7, right: 0.7,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };

    /* Logo B64 */
    const logo = this._workbook.addImage({ 
      base64: LOGO,
      extension: 'png'
    });

    const position: ImagePosition = {
      tl: { col: 1.70, row: 3.0 },
      ext: {width: 176, height: 84}
    }

    sheet.addImage(logo, position);

    /* Font  */
    sheet.getColumn('K').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('A').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('B').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('C').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('E').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('G').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('L').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('U').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('Q').font = { name: 'Raleway', size: 14 };
    sheet.getColumn('T').font = { name: 'Raleway', size: 14 };

    /* ancho de columnas */
    sheet.getColumn('A').width =  4.2;
    sheet.getColumn('B').width =  4.2;
    sheet.getColumn('C').width =  4.2;
    sheet.getColumn('D').width =  4.2;
    sheet.getColumn('E').width =  4.2;
    sheet.getColumn('F').width =  4.2;
    sheet.getColumn('G').width =  4.2;
    sheet.getColumn('H').width =  4.2;
    sheet.getColumn('I').width =  4.2;
    sheet.getColumn('J').width =  4.2;
    sheet.getColumn('K').width =  4.2;
    sheet.getColumn('L').width =  4.2;
    sheet.getColumn('M').width =  4.2;
    sheet.getColumn('N').width =  4.2;
    sheet.getColumn('O').width =  4.2;
    sheet.getColumn('P').width =  4.2;
    sheet.getColumn('Q').width =  4.2;
    sheet.getColumn('R').width =  4.2;
    sheet.getColumn('S').width =  4.2;
    sheet.getColumn('T').width =  4.2;
    sheet.getColumn('U').width =  4.2;
    sheet.getColumn('V').width =  4.2;
    sheet.getColumn('W').width =  4.2;
    sheet.getColumn('X').width =  4.2;
    sheet.getColumn('Y').width =  4.2;
    sheet.getColumn('Z').width =  4.2;
    sheet.getColumn('AA').width = 4.2;
    sheet.getColumn('AB').width = 4.2;
    sheet.getColumn('AC').width = 4.2;
    sheet.getRow(1).height = 20;

    /* borde izquierdo */
    sheet.getCell('A3').border =  { left: { style: 'double' }, top: { style: 'double' } }
    sheet.getCell('A4').border =  { left: { style: 'double' } };
    sheet.getCell('A5').border =  { left: { style: 'double' } };
    sheet.getCell('A6').border =  { left: { style: 'double' } };
    sheet.getCell('A7').border =  { left: { style: 'double' } };
    sheet.getCell('A8').border =  { left: { style: 'double' } };
    sheet.getCell('A9').border =  { left: { style: 'double' } };
    sheet.getCell('A10').border = { left: { style: 'double' } };
    sheet.getCell('A11').border = { left: { style: 'double' } };
    sheet.getCell('A12').border = { left: { style: 'double' } };
    sheet.getCell('A13').border = { left: { style: 'double' } };
    sheet.getCell('A14').border = { left: { style: 'double' } };
    sheet.getCell('A15').border = { left: { style: 'double' } };
    sheet.getCell('A16').border = { left: { style: 'double' } };
    sheet.getCell('A17').border = { left: { style: 'double' } };
    sheet.getCell('A18').border = { left: { style: 'double' } };
    sheet.getCell('A19').border = { left: { style: 'double' } };
    sheet.getCell('A20').border = { left: { style: 'double' } };
    sheet.getCell('A21').border = { left: { style: 'double' } };
    sheet.getCell('A22').border = { left: { style: 'double' } };
    sheet.getCell('A23').border = { left: { style: 'double' } };
    sheet.getCell('A24').border = { left: { style: 'double' } };
    sheet.getCell('A25').border = { left: { style: 'double' } };
    sheet.getCell('A26').border = { left: { style: 'double' } };
    sheet.getCell('A27').border = { left: { style: 'double' } };
    sheet.getCell('A28').border = { left: { style: 'double' } };
    sheet.getCell('A29').border = { left: { style: 'double' } };
    sheet.getCell('A30').border = { left: { style: 'double' } };
    sheet.getCell('A31').border = { left: { style: 'double' } };
    sheet.getCell('A32').border = { left: { style: 'double' } };
    sheet.getCell('A33').border = { left: { style: 'double' } };
    sheet.getCell('A34').border = { left: { style: 'double' } };
    sheet.getCell('A35').border = { left: { style: 'double' } };
    sheet.getCell('A36').border = { left: { style: 'double' } };
    sheet.getCell('A37').border = { left: { style: 'double' } };
    sheet.getCell('A38').border = { left: { style: 'double' } };
    sheet.getCell('A39').border = { left: { style: 'double' } };
    sheet.getCell('A40').border = { left: { style: 'double' } };
    sheet.getCell('A41').border = { left: { style: 'double' } };
    sheet.getCell('A42').border = { left: { style: 'double' } };
    sheet.getCell('A43').border = { left: { style: 'double' } };
    sheet.getCell('A44').border = { left: { style: 'double' } };
    sheet.getCell('A45').border = { left: { style: 'double' } };
    sheet.getCell('A46').border = { left: { style: 'double' } };
    sheet.getCell('A47').border = { left: { style: 'double' } };
    sheet.getCell('A48').border = { left: { style: 'double' }, bottom: { style: 'double'} }

    /* Columna B */
    sheet.getCell('B3').border =  { top: { style: 'double' } }
    sheet.getCell('B22').font = { bold: true, size: 14 }
    sheet.getCell('B22').alignment = { vertical: 'middle', horizontal: 'center' }

    /* Border Top */
    sheet.getCell('B3').border =  { top: { style: 'double' } };
    sheet.getCell('C3').border =  { top: { style: 'double' } };
    sheet.getCell('D3').border =  { top: { style: 'double' } };
    sheet.getCell('E3').border =  { top: { style: 'double' } };
    sheet.getCell('F3').border =  { top: { style: 'double' } };
    sheet.getCell('G3').border =  { top: { style: 'double' } };
    sheet.getCell('H3').border =  { top: { style: 'double' } };
    sheet.getCell('I3').border =  { top: { style: 'double' } };
    sheet.getCell('J3').border =  { top: { style: 'double' } };
    sheet.getCell('K3').border =  { top: { style: 'double' } };
    sheet.getCell('L3').border =  { top: { style: 'double' } };
    sheet.getCell('M3').border =  { top: { style: 'double' } };
    sheet.getCell('N3').border =  { top: { style: 'double' } };
    sheet.getCell('O3').border =  { top: { style: 'double' } };
    sheet.getCell('P3').border =  { top: { style: 'double' } };
    sheet.getCell('Q3').border =  { top: { style: 'double' } };
    sheet.getCell('R3').border =  { top: { style: 'double' } };
    sheet.getCell('S3').border =  { top: { style: 'double' } };
    sheet.getCell('T3').border =  { top: { style: 'double' } };
    sheet.getCell('U3').border =  { top: { style: 'double' } };
    sheet.getCell('V3').border =  { top: { style: 'double' } };
    sheet.getCell('W3').border =  { top: { style: 'double' } };
    sheet.getCell('X3').border =  { top: { style: 'double' } };
    sheet.getCell('Y3').border =  { top: { style: 'double' } };
    sheet.getCell('Z3').border =  { top: { style: 'double' } };
    sheet.getCell('AA3').border = { top: { style: 'double' } };
    sheet.getCell('AB3').border = { top: { style: 'double' } };
    sheet.getCell('AC3').border = { top: { style: 'double' }, right: { style: 'double'} };

    /* Border Bottom */
    sheet.getCell('B48').border =  { bottom: { style: 'double'} };
    sheet.getCell('C48').border =  { bottom: { style: 'double'} };
    sheet.getCell('D48').border =  { bottom: { style: 'double'} };
    sheet.getCell('E48').border =  { bottom: { style: 'double'} };
    sheet.getCell('F48').border =  { bottom: { style: 'double'} };
    sheet.getCell('G48').border =  { bottom: { style: 'double'} };
    sheet.getCell('H48').border =  { bottom: { style: 'double'} };
    sheet.getCell('I48').border =  { bottom: { style: 'double'} };
    sheet.getCell('J48').border =  { bottom: { style: 'double'} };
    sheet.getCell('K48').border =  { bottom: { style: 'double'} };
    sheet.getCell('L48').border =  { bottom: { style: 'double'} };
    sheet.getCell('M48').border =  { bottom: { style: 'double'} };
    sheet.getCell('N48').border =  { bottom: { style: 'double'} };
    sheet.getCell('O48').border =  { bottom: { style: 'double'} };
    sheet.getCell('P48').border =  { bottom: { style: 'double'} };
    sheet.getCell('Q48').border =  { bottom: { style: 'double'} };
    sheet.getCell('R48').border =  { bottom: { style: 'double'} };
    sheet.getCell('S48').border =  { bottom: { style: 'double'} };
    sheet.getCell('T48').border =  { bottom: { style: 'double'} };
    sheet.getCell('U48').border =  { bottom: { style: 'double'} };
    sheet.getCell('V48').border =  { bottom: { style: 'double'} };
    sheet.getCell('W48').border =  { bottom: { style: 'double'} };
    sheet.getCell('X48').border =  { bottom: { style: 'double'} };
    sheet.getCell('Y48').border =  { bottom: { style: 'double'} };
    sheet.getCell('Z48').border =  { bottom: { style: 'double'} };
    sheet.getCell('AA48').border = { bottom: { style: 'double'} };
    sheet.getCell('AB48').border = { bottom: { style: 'double'} };
    sheet.getCell('AC48').border = { bottom: { style: 'double'}, right: { style: 'double'} };

    /* Border Right double AC */
    sheet.getCell('AC4').border =   { right: { style: 'double'} };
    sheet.getCell('AC5').border =   { right: { style: 'double'} };
    sheet.getCell('AC6').border =   { right: { style: 'double'} };
    sheet.getCell('AC7').border =   { right: { style: 'double'} };
    sheet.getCell('AC8').border =   { right: { style: 'double'} };
    sheet.getCell('AC9').border =   { right: { style: 'double'} };
    sheet.getCell('AC10').border =  { right: { style: 'double'} };
    sheet.getCell('AC11').border =  { right: { style: 'double'} };
    sheet.getCell('AC12').border =  { right: { style: 'double'} };
    sheet.getCell('AC13').border =  { right: { style: 'double'} };
    sheet.getCell('AC14').border =  { right: { style: 'double'} };
    sheet.getCell('AC15').border =  { right: { style: 'double'} };
    sheet.getCell('AC16').border =  { right: { style: 'double'} };
    sheet.getCell('AC17').border =  { right: { style: 'double'} };
    sheet.getCell('AC18').border =  { right: { style: 'double'} };
    sheet.getCell('AC19').border =  { right: { style: 'double'} };
    sheet.getCell('AC20').border =  { right: { style: 'double'} };
    sheet.getCell('AC21').border =  { right: { style: 'double'} };
    sheet.getCell('AC22').border =  { right: { style: 'double'} };
    sheet.getCell('AC23').border =  { right: { style: 'double'} };
    sheet.getCell('AC24').border =  { right: { style: 'double'} };
    sheet.getCell('AC25').border =  { right: { style: 'double'} };
    sheet.getCell('AC26').border =  { right: { style: 'double'} };
    sheet.getCell('AC27').border =  { right: { style: 'double'} };
    sheet.getCell('AC28').border =  { right: { style: 'double'} };
    sheet.getCell('AC29').border =  { right: { style: 'double'} };
    sheet.getCell('AC30').border =  { right: { style: 'double'} };
    sheet.getCell('AC31').border =  { right: { style: 'double'} };
    sheet.getCell('AC32').border =  { right: { style: 'double'} };
    sheet.getCell('AC33').border =  { right: { style: 'double'} };
    sheet.getCell('AC34').border =  { right: { style: 'double'} };
    sheet.getCell('AC35').border =  { right: { style: 'double'} };
    sheet.getCell('AC36').border =  { right: { style: 'double'} };
    sheet.getCell('AC37').border =  { right: { style: 'double'} };
    sheet.getCell('AC38').border =  { right: { style: 'double'} };
    sheet.getCell('AC39').border =  { right: { style: 'double'} };
    sheet.getCell('AC40').border =  { right: { style: 'double'} };
    sheet.getCell('AC41').border =  { right: { style: 'double'} };
    sheet.getCell('AC42').border =  { right: { style: 'double'} };
    sheet.getCell('AC43').border =  { right: { style: 'double'} };
    sheet.getCell('AC44').border =  { right: { style: 'double'} };
    sheet.getCell('AC45').border =  { right: { style: 'double'} };
    sheet.getCell('AC46').border =  { right: { style: 'double'} };
    sheet.getCell('AC47').border =  { right: { style: 'double'} };

    /* Separacion media hoja */
    sheet.getCell('B20').border =   { bottom: { style: 'double'} };
    sheet.getCell('C20').border =   { bottom: { style: 'double'} };
    sheet.getCell('D20').border =   { bottom: { style: 'double'} };
    sheet.getCell('E20').border =   { bottom: { style: 'double'} };
    sheet.getCell('F20').border =   { bottom: { style: 'double'} };
    sheet.getCell('G20').border =   { bottom: { style: 'double'} };
    sheet.getCell('H20').border =   { bottom: { style: 'double'} };
    sheet.getCell('I20').border =   { bottom: { style: 'double'} };
    sheet.getCell('J20').border =   { bottom: { style: 'double'} };
    sheet.getCell('K20').border =   { bottom: { style: 'double'} };
    sheet.getCell('L20').border =   { bottom: { style: 'double'} };
    sheet.getCell('M20').border =   { bottom: { style: 'double'} };
    sheet.getCell('N20').border =   { bottom: { style: 'double'} };
    sheet.getCell('O20').border =   { bottom: { style: 'double'} };
    sheet.getCell('P20').border =   { bottom: { style: 'double'} };
    sheet.getCell('Q20').border =   { bottom: { style: 'double'} };
    sheet.getCell('R20').border =   { bottom: { style: 'double'} };
    sheet.getCell('S20').border =   { bottom: { style: 'double'} };
    sheet.getCell('T20').border =   { bottom: { style: 'double'} };
    sheet.getCell('U20').border =   { bottom: { style: 'double'} };
    sheet.getCell('V20').border =   { bottom: { style: 'double'} };
    sheet.getCell('W20').border =   { bottom: { style: 'double'} };
    sheet.getCell('X20').border =   { bottom: { style: 'double'} };
    sheet.getCell('Y20').border =   { bottom: { style: 'double'} };
    sheet.getCell('Z20').border =   { bottom: { style: 'double'} };
    sheet.getCell('AA20').border =  { bottom: { style: 'double'} };
    sheet.getCell('AB20').border =  { bottom: { style: 'double'} };

     /* Celdas combinadas */    
    sheet.mergeCells('U9:V9');
    sheet.mergeCells('AA9:AB9');

    /* Titulo */
    sheet.mergeCells('A2:AC2');
    sheet.getCell('A2').value = 'FORMATO 2 (Anexo del oficio No. FGR/CPA/DGRHO/0517/2022)';
    sheet.getCell('A2').font = { name: 'Raleway', size: 12 }
    sheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'right' };

    sheet.mergeCells('K4:AB4');
    sheet.getCell('K4').alignment = { vertical: 'middle', horizontal: 'center'}
    sheet.getCell('K4').value = 'SOLICITUD/AUTORIZACIÓN INDIVIDUAL DE VACACIONES';
    sheet.getCell('K4').font = { name: 'Raleway', size: 12, bold: true };
    
    sheet.mergeCells('K5:AB5');
    sheet.getCell('K5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    sheet.getCell('K5').value = 'SERVIDORES PÚBLICOS DE CONFIANZA Y BASE';
    sheet.getCell('K5').font = { name: 'Raleway', size: 12, bold: true };

    /* Fecha */
    sheet.mergeCells('P7:R7');
    sheet.getCell('P7').value = 'Fecha: ';
    sheet.getCell('P7').font = { name: 'Raleway', size: 13, bold: true }
    sheet.mergeCells('S7:AA7');
    sheet.getCell('S7').border = { bottom: { style: 'thin'} };

    /* Celdas combinadas nombre */
    sheet.mergeCells('B9:O9');
    sheet.getCell('B9').value = 'DATOS DEL SERVIDOR PÚBLICO DE:';
    sheet.getCell('B9').font = { bold: true, size: 13, name: 'Raleway' };

    sheet.mergeCells('P9:T9');
    sheet.getCell('P9').value = 'CONFIANZA';
    sheet.getCell('P9').font = { size: 13, name: 'Raleway'};
    sheet.getCell('U9').border = { top: { style: 'thick' }, bottom: { style: 'thick'}, left: { style: 'thick'}, right: { style: 'thick'} }

    sheet.mergeCells('X9:Y9');
    sheet.getCell('X9').value = 'BASE';
    sheet.getCell('X9').font = { size: 13,  name: 'Raleway', }
    sheet.getCell('AA9').border = { top: { style: 'thick' }, bottom: { style: 'thick'}, left: { style: 'thick'}, right: { style: 'thick'} }

    sheet.mergeCells('C11:J11');
    sheet.getCell('C11').border = { bottom: {style: 'thin'} };
    sheet.mergeCells('L11:S11');
    sheet.getCell('L11').border = { bottom: {style: 'thin'} };
    sheet.mergeCells('U11:AA11');
    sheet.getCell('U11').border = { bottom: {style: 'thin'} };
  
    sheet.mergeCells('C12:J12');
    sheet.getCell('C12').value = 'Apellido Paterno'
    sheet.getCell('C12').alignment = { vertical: 'middle', horizontal: 'center' }
    
    sheet.mergeCells('L12:S12');
    sheet.getCell('L12').value = 'Apellido Materno'
    sheet.getCell('L12').alignment = { vertical: 'middle', horizontal: 'center' }
    
    sheet.mergeCells('U12:AA12');
    sheet.getCell('U12').value = 'Nombre (s)'
    sheet.getCell('U12').alignment = { vertical: 'middle', horizontal: 'center' }

    sheet.mergeCells('E14:M14');
    sheet.getCell('E14').border = { bottom: {style: 'thin'} };
    sheet.mergeCells('T14:Y14');
    sheet.getCell('T14').border = { bottom: {style: 'thin'} };

    sheet.mergeCells('E15:M15');
    sheet.getCell('E15').value = 'R.F.C. con Homoclave';
    sheet.getCell('E15').alignment = { vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('T15:Y15');
    sheet.getCell('T15').value = 'Micro o Ext. Tel';
    sheet.getCell('T15').alignment = { vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('C17:N17');
    sheet.getCell('C17').border = { bottom: {style: 'thin'} };

    sheet.mergeCells('Q17:AA17');
    sheet.getCell('Q17').border = { bottom: {style: 'thin'} };

    sheet.mergeCells('C18:N19');
    sheet.getCell('C18').value = 'Unidad Administrativa y Área de Adscripción';
    sheet.getCell('C18').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center'  };

    sheet.mergeCells('Q18:AA19')
    sheet.getCell('Q18').value = 'Puesto';
    sheet.getCell('Q18').alignment = { vertical: 'middle', horizontal: 'center' }

    /* periodo */
    sheet.mergeCells('B22:AA22');
    sheet.getCell('B22').value = 'De Conformidad con el Oficio No. FGR/CPA/DGRHO/0517/2022';

    sheet.mergeCells('C24:F24');
    sheet.getCell('C24').value = 'Periodo:';
    sheet.getCell('C24').font = { name: 'Raleway', bold: true }
    sheet.mergeCells('G24:AA24');
    sheet.getCell('G24').border = { bottom: { style: 'thin'} }

    sheet.mergeCells('C25:F25');
    sheet.getCell('C25').value = 'Del:';
    sheet.getCell('C25').font = { name: 'Raleway', bold: true }
    sheet.mergeCells('G25:AA25');
    sheet.getCell('G25').border = { bottom: { style: 'thin'} }

    sheet.mergeCells('C26:I26');
    sheet.getCell('C26').value = 'Número de días solicitados:';
    sheet.getCell('C26').font = { name: 'Raleway', bold: true, size: 10 }
    sheet.mergeCells('J26:AA26');
    sheet.getCell('J26').border = { bottom: { style: 'thin'} }

    sheet.mergeCells('C28:Q28');
    sheet.getCell('C28').value = 'Número de días hábiles autorizados del periodo: ';
    sheet.getCell('C28').font = { name: 'Raleway', size: 13 };
    sheet.mergeCells('U28:V28');
    sheet.getCell('U28').border = { top: { style: 'thick' }, bottom: { style: 'thick'}, left: { style: 'thick'}, right: { style: 'thick'} };

    sheet.mergeCells('C30:Q30');
    sheet.getCell('C30').value = 'Número de días pendiente por disfrutar del periodo: ';
    sheet.getCell('C30').font = {name: 'Raleway', size: 13 };
    sheet.mergeCells('U30:V30');
    sheet.getCell('U30').border = { top: { style: 'thick' }, bottom: { style: 'thick'}, left: { style: 'thick'}, right: { style: 'thick'} };

    sheet.mergeCells('C32:AA32');
    sheet.getCell('C32').value = 'Observaciones: ';
    sheet.getCell('C32').font = { size: 12 , name: 'Raleway' };
    sheet.getCell('C32').alignment = { vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('C33:AA33');
    sheet.getCell('C33').border = { bottom: { style: 'thin'} };

    sheet.mergeCells('C34:AA34');
    sheet.getCell('C34').border = { bottom: { style: 'thin'} };
    
    sheet.mergeCells('C36:AA36');
    sheet.getCell('C36').value = 'Lo anterior, toda vez que me encuentro al corriente del cumplimiento de mis funciones y conforme al derecho que me asiste al contar con más de seis meses de servicios ininterrumpidos en el desempeño de mi cargo.';
    sheet.getCell('C36').font = { name: 'Raleway', size: 9 };
    sheet.getCell('C36').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    sheet.getRow(36).height = 26;

    sheet.mergeCells('I38:V38');
    sheet.getCell('I38').border = { bottom: { style: 'thin'} };
    sheet.mergeCells('I39:V39');
    sheet.getCell('I39').value = 'Nombre y Firma del Solicitante'
    sheet.getCell('I39').font = { name: 'Raleway', size: 12 }
    sheet.getCell('I39').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('C41:AA41');
    sheet.getCell('C41').value = 'En mi carácter de superior jerárquico del servidor público solicitante y de conformidad con las disposiciones legales y administrativas, autorizo disfrutar el período vacacional señalado.';
    sheet.getCell('C41').font = { name: 'Raleway', size: 9 };
    sheet.getCell('C41').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    sheet.getRow(41).height = 26;
    
    /* Firmas */
    sheet.mergeCells('B43:M43');
    sheet.getCell('B43').value = 'Autoriza';
    sheet.getCell('B43').font = { name: 'Raleway', size: 13 };
    sheet.getCell('B43').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('Q43:AB43');
    sheet.getCell('Q43').value = 'Vo.Bo.';
    sheet.getCell('Q43').font = { name: 'Raleway', size: 13 };
    sheet.getCell('Q43').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };

    sheet.mergeCells('B46:M46');
    sheet.getCell('B46').border = { bottom: { style: 'thin'} }

    sheet.mergeCells('B47:M47');
    sheet.getCell('B47').value = 'Lcda. Erendira Torres Ramírez                 Administradora Ejecutiva';
    sheet.getCell('B47').font = { name: 'Raleway', size: 13 };
    sheet.getCell('B47').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    sheet.getRow(47).height = 36;

    sheet.mergeCells('Q46:AB46');
    sheet.getCell('Q46').border = { bottom: { style: 'thin'} }
    
    sheet.mergeCells('Q47:AB47');
    sheet.getCell('Q47').value = 'Marco Antonio Said Maauad                           Director General';
    sheet.getCell('Q47').font = { name: 'Raleway', size: 13 };
    sheet.getCell('Q47').alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    sheet.getRow(47).height = 36;

  }
  

}
