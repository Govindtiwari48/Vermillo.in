import { SavedAddress, SavedPaymentMethod } from './types';

const STORAGE_KEYS = {
  ADDRESSES: 'vermillo_saved_addresses',
  PAYMENT_METHODS: 'vermillo_saved_payment_methods',
  USER_ID: 'vermillo_user_id',
};

// Generate a simple user ID based on browser fingerprint
function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    // Create a simple ID based on timestamp and random
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
}

// Address Management
export function getSavedAddresses(): SavedAddress[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveAddress(address: Omit<SavedAddress, 'id'>): SavedAddress {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }
  
  const addresses = getSavedAddresses();
  const newAddress: SavedAddress = {
    ...address,
    id: `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  
  // If this is set as default, remove default from others
  if (newAddress.isDefault) {
    addresses.forEach(addr => { addr.isDefault = false; });
  }
  
  addresses.push(newAddress);
  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  return newAddress;
}

export function updateAddress(id: string, updates: Partial<SavedAddress>): SavedAddress | null {
  if (typeof window === 'undefined') return null;
  
  const addresses = getSavedAddresses();
  const index = addresses.findIndex(addr => addr.id === id);
  
  if (index === -1) return null;
  
  // If setting as default, remove default from others
  if (updates.isDefault) {
    addresses.forEach(addr => { addr.isDefault = false; });
  }
  
  addresses[index] = { ...addresses[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  return addresses[index];
}

export function deleteAddress(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const addresses = getSavedAddresses();
  const filtered = addresses.filter(addr => addr.id !== id);
  localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(filtered));
  return filtered.length < addresses.length;
}

export function getDefaultAddress(): SavedAddress | null {
  const addresses = getSavedAddresses();
  return addresses.find(addr => addr.isDefault) || addresses[0] || null;
}

// Payment Method Management
export function getSavedPaymentMethods(): SavedPaymentMethod[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function savePaymentMethod(method: Omit<SavedPaymentMethod, 'id'>): SavedPaymentMethod {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }
  
  const methods = getSavedPaymentMethods();
  const newMethod: SavedPaymentMethod = {
    ...method,
    id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  
  // If this is set as default, remove default from others
  if (newMethod.isDefault) {
    methods.forEach(m => { m.isDefault = false; });
  }
  
  methods.push(newMethod);
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  return newMethod;
}

export function updatePaymentMethod(id: string, updates: Partial<SavedPaymentMethod>): SavedPaymentMethod | null {
  if (typeof window === 'undefined') return null;
  
  const methods = getSavedPaymentMethods();
  const index = methods.findIndex(m => m.id === id);
  
  if (index === -1) return null;
  
  // If setting as default, remove default from others
  if (updates.isDefault) {
    methods.forEach(m => { m.isDefault = false; });
  }
  
  methods[index] = { ...methods[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
  return methods[index];
}

export function deletePaymentMethod(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const methods = getSavedPaymentMethods();
  const filtered = methods.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(filtered));
  return filtered.length < methods.length;
}

export function getDefaultPaymentMethod(): SavedPaymentMethod | null {
  const methods = getSavedPaymentMethods();
  return methods.find(m => m.isDefault) || methods[0] || null;
}

// User ID
export function getUserId(): string {
  return getOrCreateUserId();
}

