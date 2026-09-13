export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount) + ' FCFA';
}

export function generateOrderReference(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const letters = ['CM', 'DLA', 'YDE', 'MOMO', 'OM'];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  return `CJA-${letter}-${new Date().getFullYear()}-${randomDigits}`;
}

export function generateTransactionId(provider: 'mtn_momo' | 'orange_money' | 'cash_on_delivery'): string {
  const timestamp = Date.now().toString().slice(-6);
  if (provider === 'mtn_momo') {
    return `MTN-CM-TX${timestamp}`;
  } else if (provider === 'orange_money') {
    return `OM-CM-TX${timestamp}`;
  }
  return `COD-LIVRAISON-${timestamp}`;
}

export function formatCameroonPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('237') && cleaned.length === 12) {
    return `+237 ${cleaned.slice(3, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
  }
  return phone;
}
