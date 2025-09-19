import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Web3 Vault Core: Create Collection Test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('web3-vault-core', 'create-collection', 
                [
                    types.ascii('test-collection-1'),
                    types.utf8('Test Collection'),
                    types.some(types.utf8('A test collection for assets'))
                ], 
                deployer.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});

Clarinet.test({
    name: "Web3 Vault Core: Add Document Test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('web3-vault-core', 'add-document', 
                [
                    types.ascii('test-doc-1'),
                    types.utf8('Test Asset'),
                    types.some(types.utf8('A test digital asset')),
                    types.ascii('json'),
                    types.utf8('ipfs://test-location'),
                    types.buff(Buffer.from('test-hash')),
                    types.uint(1000)
                ], 
                deployer.address
            )
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    }
});