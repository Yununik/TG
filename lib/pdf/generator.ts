/**
 * PDF Generator
 * Генерация PDF документов на основе шаблонов с подстановкой данных
 */

import { PDFDocument, rgb, PDFPage, PDFFont } from 'pdf-lib';
import { UserProfile, CounterpartyData } from '../db/database';

export interface PDFGenerationOptions {
  includeSignature?: boolean;
  signaturePosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Замена плейсхолдеров в тексте шаблона
 */
function replacePlaceholders(
  template: string,
  userData: UserProfile,
  counterpartyData: CounterpartyData
): string {
  let result = template;

  // Данные пользователя
  result = result.replace(/\{\{company_name\}\}/g, userData.companyName || '');
  result = result.replace(/\{\{user_inn\}\}/g, userData.inn || '');
  result = result.replace(/\{\{user_ogrn\}\}/g, userData.ogrn || '');
  result = result.replace(/\{\{user_legal_address\}\}/g, userData.legalAddress || '');
  result = result.replace(/\{\{user_postal_address\}\}/g, userData.postalAddress || '');
  result = result.replace(/\{\{user_bank_name\}\}/g, userData.bankName || '');
  result = result.replace(/\{\{user_bik\}\}/g, userData.bik || '');
  result = result.replace(/\{\{user_account\}\}/g, userData.account || '');
  result = result.replace(/\{\{user_correspondent_account\}\}/g, userData.correspondentAccount || '');

  // Данные контрагента
  result = result.replace(/\{\{counterparty_name\}\}/g, counterpartyData.name || '');
  result = result.replace(/\{\{counterparty_inn\}\}/g, counterpartyData.inn || '');
  result = result.replace(/\{\{counterparty_ogrn\}\}/g, counterpartyData.ogrn || '');
  result = result.replace(/\{\{counterparty_legal_address\}\}/g, counterpartyData.legalAddress || '');
  result = result.replace(/\{\{counterparty_postal_address\}\}/g, counterpartyData.postalAddress || '');
  result = result.replace(/\{\{counterparty_bank_name\}\}/g, counterpartyData.bankName || '');
  result = result.replace(/\{\{counterparty_bik\}\}/g, counterpartyData.bik || '');
  result = result.replace(/\{\{counterparty_account\}\}/g, counterpartyData.account || '');
  result = result.replace(/\{\{counterparty_correspondent_account\}\}/g, counterpartyData.correspondentAccount || '');

  // Дата
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  result = result.replace(/\{\{date\}\}/g, dateStr);

  // Удаление пустых блоков (если поле пустое)
  result = result.replace(/\{\{if:([^}]+)\}\}([\s\S]*?)\{\{endif\}\}/g, (match, condition, content) => {
    // Простая проверка: если переменная существует и не пустая
    const varName = condition.trim();
    const hasValue = result.includes(`{{${varName}}}`) && 
                     !result.match(new RegExp(`\\{\\{${varName}\\}\\}`))?.[0]?.includes('{{');
    return hasValue ? content : '';
  });

  return result;
}

/**
 * Разбиение текста на строки с учетом ширины страницы
 */
function wrapText(text: string, maxWidth: number, fontSize: number, font: PDFFont): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Добавление текста на страницу PDF с переносами
 */
async function addTextToPage(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  font: PDFFont,
  maxWidth: number = 495,
  lineHeight: number = 14
): Promise<number> {
  const lines = wrapText(text, maxWidth, fontSize, font);
  let currentY = y;

  for (const line of lines) {
    page.drawText(line, {
      x,
      y: currentY,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    currentY -= lineHeight;

    // Если текст не помещается, создаем новую страницу
    if (currentY < 50) {
      // В будущем можно добавить логику создания новой страницы
      break;
    }
  }

  return currentY;
}

/**
 * Генерация PDF документа
 */
export async function generatePDF(
  template: string,
  userData: UserProfile,
  counterpartyData: CounterpartyData,
  options: PDFGenerationOptions = {}
): Promise<Uint8Array> {
  // Создание PDF документа
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 размер

  // Загрузка стандартного шрифта
  const font = await pdfDoc.embedFont('Helvetica');

  // Замена плейсхолдеров
  const content = replacePlaceholders(template, userData, counterpartyData);

  // Разбиение на параграфы
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  let yPosition = 800; // Начальная позиция сверху
  const margin = 50;
  const lineHeight = 14;
  const fontSize = 12;

  // Добавление текста на страницу
  for (const paragraph of paragraphs) {
    const lines = paragraph.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        yPosition = await addTextToPage(
          page,
          line.trim(),
          margin,
          yPosition,
          fontSize,
          font,
          495,
          lineHeight
        );
        yPosition -= 5; // Отступ между строками
      }
    }
    yPosition -= 10; // Отступ между параграфами

    // Если достигли низа страницы, создаем новую
    if (yPosition < 100) {
      const newPage = pdfDoc.addPage([595, 842]);
      yPosition = 800;
    }
  }

  // Наложение подписи, если требуется
  if (options.includeSignature && userData.signatureImage) {
    try {
      const signatureImage = await pdfDoc.embedPng(userData.signatureImage);
      const position = options.signaturePosition || {
        x: 400,
        y: 50,
        width: 150,
        height: 50,
      };

      const lastPage = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
      lastPage.drawImage(signatureImage, {
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
      });
    } catch (error) {
      console.error('Ошибка при наложении подписи:', error);
    }
  }

  // Генерация PDF байтов
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Скачивание PDF файла
 */
export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'contract.pdf'): void {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
