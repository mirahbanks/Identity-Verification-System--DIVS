import { describe, it, expect, beforeEach } from 'vitest';
import { simulateContractCall } from './utils/contract-simulator';

describe('Identity DAO Contract', () => {
  const admin = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const newAdmin = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  const nonAdmin = 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0';
  
  beforeEach(() => {
    // Reset contract state before each test
  });
  
  it('should return the initial admin', () => {
    const result = simulateContractCall('identity-dao', 'get-admin', [], admin);
    expect(result.success).toBe(true);
    expect(result.value).toBe(admin);
  });
  
  it('should allow admin to set a new admin', () => {
    const result = simulateContractCall('identity-dao', 'set-admin', [newAdmin], admin);
    expect(result.success).toBe(true);
    
    const getAdminResult = simulateContractCall('identity-dao', 'get-admin', [], newAdmin);
    expect(getAdminResult.success).toBe(true);
    expect(getAdminResult.value).toBe(newAdmin);
  });
  
  it('should not allow non-admin to set a new admin', () => {
    const result = simulateContractCall('identity-dao', 'set-admin', [nonAdmin], nonAdmin);
    expect(result.success).toBe(false);
    expect(result.error).toBe(403);
  });
});

