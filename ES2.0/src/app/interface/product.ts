export interface Product {
  id: string;
  nome: string;
  codice: string;
  edizione: string | null;
  materiale: string;
  lavorazione: string | null;
  size: string | null;
  price_no_iva: string;
  price_iva: string;
  tipologia: string;
  description: string;
  nome_eng: string;
  desc_eng: string;
  collection: string;
}
