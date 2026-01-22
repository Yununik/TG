/**
 * Парсер реквизитов контрагента из текста
 * Извлечение ИНН, ОГРН, наименования, адресов и банковских реквизитов
 */

export interface ParsedCounterparty {
  name?: string;
  inn?: string;
  ogrn?: string;
  legalAddress?: string;
  postalAddress?: string;
  bankName?: string;
  bik?: string;
  account?: string;
  correspondentAccount?: string;
  phone?: string;
  email?: string;
}

/**
 * Регулярные выражения для парсинга
 */
const patterns = {
  // ИНН: 10 цифр для ИП, 12 цифр для организаций
  inn: /\b(?:ИНН|ИНН:?)\s*:?\s*(\d{10,12})\b/gi,
  
  // ОГРН: 13 цифр для организаций, 15 для ИП
  ogrn: /\b(?:ОГРН|ОГРНИП|ОГРН:?)\s*:?\s*(\d{13,15})\b/gi,
  
  // Наименование (обычно идет перед ИНН или в начале)
  name: /(?:^|[\n\r])([А-ЯЁ][А-Яа-яё\s"«»\-]{5,100}?)(?:\s+ИНН|\s+ОГРН|$)/i,
  
  // Юридический адрес
  legalAddress: /\b(?:юр\.?\s*адрес|юридический\s+адрес|адрес\s+регистрации)\s*:?\s*([А-Яа-яё0-9\s,.\-]{10,200})/gi,
  
  // Почтовый адрес
  postalAddress: /\b(?:почтовый\s+адрес|почт\.?\s*адрес)\s*:?\s*([А-Яа-яё0-9\s,.\-]{10,200})/gi,
  
  // Банк
  bankName: /\b(?:банк|Банк)\s*:?\s*([А-ЯЁ][А-Яа-яё\s"«»\-]{3,100}?)(?:\s+БИК|$)/i,
  
  // БИК
  bik: /\b(?:БИК|БИК:?)\s*:?\s*(\d{9})\b/gi,
  
  // Расчетный счет
  account: /\b(?:р\/с|расчетный\s+счет|р\.?\s*с\.?)\s*:?\s*(\d{20})\b/gi,
  
  // Корреспондентский счет
  correspondentAccount: /\b(?:к\/с|корр\.?\s*счет|к\.?\s*с\.?)\s*:?\s*(\d{20})\b/gi,
  
  // Телефон
  phone: /\b(?:\+?7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}\b/g,
  
  // Email
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
};

/**
 * Парсинг реквизитов контрагента из текста
 */
export function parseCounterparty(text: string): ParsedCounterparty {
  const result: ParsedCounterparty = {};

  // ИНН
  const innMatch = text.match(patterns.inn);
  if (innMatch) {
    result.inn = innMatch[0].replace(/[^\d]/g, '').slice(-12);
  }

  // ОГРН
  const ogrnMatch = text.match(patterns.ogrn);
  if (ogrnMatch) {
    result.ogrn = ogrnMatch[0].replace(/[^\d]/g, '');
  }

  // Наименование
  const nameMatch = text.match(patterns.name);
  if (nameMatch) {
    result.name = nameMatch[1].trim();
  }

  // Юридический адрес
  const legalAddressMatch = text.match(patterns.legalAddress);
  if (legalAddressMatch) {
    result.legalAddress = legalAddressMatch[1].trim();
  }

  // Почтовый адрес
  const postalAddressMatch = text.match(patterns.postalAddress);
  if (postalAddressMatch) {
    result.postalAddress = postalAddressMatch[1].trim();
  }

  // Банк
  const bankMatch = text.match(patterns.bankName);
  if (bankMatch) {
    result.bankName = bankMatch[1].trim();
  }

  // БИК
  const bikMatch = text.match(patterns.bik);
  if (bikMatch) {
    result.bik = bikMatch[0].replace(/[^\d]/g, '');
  }

  // Расчетный счет
  const accountMatch = text.match(patterns.account);
  if (accountMatch) {
    result.account = accountMatch[0].replace(/[^\d]/g, '');
  }

  // Корреспондентский счет
  const correspondentAccountMatch = text.match(patterns.correspondentAccount);
  if (correspondentAccountMatch) {
    result.correspondentAccount = correspondentAccountMatch[0].replace(/[^\d]/g, '');
  }

  // Телефон
  const phoneMatch = text.match(patterns.phone);
  if (phoneMatch) {
    result.phone = phoneMatch[0].trim();
  }

  // Email
  const emailMatch = text.match(patterns.email);
  if (emailMatch) {
    result.email = emailMatch[0].trim();
  }

  return result;
}

/**
 * Валидация распознанных данных
 */
export function validateParsedData(data: ParsedCounterparty): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.length < 3) {
    errors.push('Не указано наименование организации');
  }

  if (!data.inn || (data.inn.length !== 10 && data.inn.length !== 12)) {
    errors.push('ИНН должен содержать 10 или 12 цифр');
  }

  if (data.ogrn && data.ogrn.length !== 13 && data.ogrn.length !== 15) {
    errors.push('ОГРН должен содержать 13 или 15 цифр');
  }

  if (data.bik && data.bik.length !== 9) {
    errors.push('БИК должен содержать 9 цифр');
  }

  if (data.account && data.account.length !== 20) {
    errors.push('Расчетный счет должен содержать 20 цифр');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
