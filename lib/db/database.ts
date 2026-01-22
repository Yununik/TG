/**
 * IndexedDB база данных (Dexie.js)
 * Схема и методы работы с локальным хранилищем
 */

import Dexie, { Table } from 'dexie';

// Типы данных
export interface UserProfile {
  id?: string;
  telegramUserId: number;
  companyName: string;
  inn: string;
  ogrn: string;
  legalAddress: string;
  postalAddress?: string;
  bankName: string;
  bik: string;
  account: string;
  correspondentAccount?: string;
  phone?: string;
  email?: string;
  signatureImage?: Blob; // Изображение подписи
  signatureImageUrl?: string; // URL для отображения
  updatedAt: Date;
}

export interface Template {
  id?: string;
  name: string;
  content: string; // HTML/Markdown шаблон с плейсхолдерами
  variables: string[]; // Список используемых переменных
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id?: string;
  templateId: string;
  counterpartyData: CounterpartyData;
  generatedPdf?: Blob; // Кэш сгенерированного PDF
  createdAt: Date;
}

export interface Counterparty {
  id?: string;
  name: string;
  inn: string;
  ogrn?: string;
  legalAddress?: string;
  postalAddress?: string;
  bankName?: string;
  bik?: string;
  account?: string;
  correspondentAccount?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CounterpartyData {
  name: string;
  inn: string;
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

// Класс базы данных
class ContractDatabase extends Dexie {
  userProfiles!: Table<UserProfile, string>;
  templates!: Table<Template, string>;
  contracts!: Table<Contract, string>;
  counterparties!: Table<Counterparty, string>;

  constructor() {
    super('ContractDatabase');

    this.version(1).stores({
      userProfiles: 'id, telegramUserId',
      templates: 'id, name, createdAt',
      contracts: 'id, templateId, createdAt',
      counterparties: 'id, inn, name, createdAt',
    });
  }
}

// Экспорт экземпляра базы данных
export const db = new ContractDatabase();

// Утилиты для работы с профилем
export async function getUserProfile(telegramUserId: number): Promise<UserProfile | undefined> {
  return await db.userProfiles.where('telegramUserId').equals(telegramUserId).first();
}

export async function saveUserProfile(profile: UserProfile): Promise<string> {
  profile.updatedAt = new Date();
  if (profile.id) {
    await db.userProfiles.update(profile.id, profile);
    return profile.id;
  } else {
    profile.id = crypto.randomUUID();
    return await db.userProfiles.add(profile);
  }
}

// Утилиты для работы с шаблонами
export async function getAllTemplates(): Promise<Template[]> {
  return await db.templates.orderBy('createdAt').reverse().toArray();
}

export async function getTemplate(id: string): Promise<Template | undefined> {
  return await db.templates.get(id);
}

export async function saveTemplate(template: Template): Promise<string> {
  template.updatedAt = new Date();
  if (template.id) {
    await db.templates.update(template.id, template);
    return template.id;
  } else {
    template.id = crypto.randomUUID();
    template.createdAt = new Date();
    return await db.templates.add(template);
  }
}

export async function deleteTemplate(id: string): Promise<void> {
  await db.templates.delete(id);
}

// Утилиты для работы с договорами
export async function saveContract(contract: Contract): Promise<string> {
  contract.createdAt = new Date();
  if (contract.id) {
    await db.contracts.update(contract.id, contract);
    return contract.id;
  } else {
    contract.id = crypto.randomUUID();
    return await db.contracts.add(contract);
  }
}

export async function getAllContracts(): Promise<Contract[]> {
  return await db.contracts.orderBy('createdAt').reverse().toArray();
}

// Утилиты для работы с контрагентами
export async function saveCounterparty(counterparty: Counterparty): Promise<string> {
  counterparty.updatedAt = new Date();
  if (counterparty.id) {
    await db.counterparties.update(counterparty.id, counterparty);
    return counterparty.id;
  } else {
    counterparty.id = crypto.randomUUID();
    counterparty.createdAt = new Date();
    return await db.counterparties.add(counterparty);
  }
}

export async function getAllCounterparties(): Promise<Counterparty[]> {
  return await db.counterparties.orderBy('createdAt').reverse().toArray();
}

export async function findCounterpartyByInn(inn: string): Promise<Counterparty | undefined> {
  return await db.counterparties.where('inn').equals(inn).first();
}
