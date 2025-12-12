// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PinoToken
 * @dev Simple ERC20-like token for rewarding learners on PinoLearn platform
 * @notice This is a simplified token contract optimized for learn-to-earn mechanics
 * @dev Deploy this contract on Polygon Mumbai testnet using Remix
 */
contract PinoToken {
    // Token metadata
    string public constant name = "Pino Reward Token";
    string public constant symbol = "PINO";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    
    // Storage
    mapping(address => uint256) public balanceOf;
    address public owner;
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Reward(address indexed to, uint256 value, string reason);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    /**
     * @dev Constructor mints initial supply to contract deployer
     */
    constructor() {
        owner = msg.sender;
        totalSupply = 1000000 * 10**18; // 1 million tokens
        balanceOf[owner] = totalSupply;
        
        emit Transfer(address(0), owner, totalSupply);
    }
    
    /**
     * @dev Modifier to restrict functions to owner only
     */
    modifier onlyOwner() {
       require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    /**
     * @dev Standard ERC20 transfer function
     * @param to Recipient address
     * @param amount Amount to transfer
     * @return success Returns true if transfer succeeded
     */
    function transfer(address to, uint256 amount) public returns (bool success) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    /**
     * @dev Reward a user with tokens (only owner can call)
     * @param user Address of the user to reward
     * @param amount Amount of tokens to reward
     * @param reason Reason for the reward (e.g., "Completed_Lesson_5")
     * @notice This function is called by the backend when users complete learning activities
     */
    function rewardUser(address user, uint256 amount, string memory reason) public onlyOwner {
        require(user != address(0), "Cannot reward zero address");
        require(balanceOf[owner] >= amount, "Insufficient owner balance");
        require(amount > 0, "Amount must be greater than 0");
        
        balanceOf[owner] -= amount;
        balanceOf[user] += amount;
        
        emit Reward(user, amount, reason);
        emit Transfer(owner, user, amount);
    }
    
    /**
     * @dev Batch reward multiple users (gas optimization)
     * @param users Array of user addresses
     * @param amounts Array of amounts corresponding to users
     */
    function batchReward(address[] memory users, uint256[] memory amounts) public onlyOwner {
        require(users.length == amounts.length, "Arrays must be same length");
        require(users.length <= 100, "Too many users in one batch");
        
        for (uint i = 0; i < users.length; i++) {
            require(users[i] != address(0), "Invalid user address");
            require(balanceOf[owner] >= amounts[i], "Insufficient balance");
            
            balanceOf[owner] -= amounts[i];
            balanceOf[users[i]] += amounts[i];
            
            emit Reward(users[i], amounts[i], "Batch_Reward");
            emit Transfer(owner, users[i], amounts[i]);
        }
    }
    
    /**
     * @dev Get balance of an account
     * @param account Address to check
     * @return balance Token balance
     */
    function getBalance(address account) public view returns (uint256 balance) {
        return balanceOf[account];
    }
    
    /**
     * @dev Transfer ownership to new address
     * @param newOwner Address of new owner
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        
        address oldOwner = owner;
        owner = newOwner;
        
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @dev Emergency function to recover accidentally sent tokens
     * @param tokenAddress Address of the token contract to recover
     */
    function recoverERC20(address tokenAddress) public onlyOwner {
        // This allows recovering other ERC20 tokens sent to this contract by mistake
        // Does not affect PINO tokens as they are managed within this contract
        require(tokenAddress != address(this), "Cannot recover PINO tokens");
        
        // Implementation would require ERC20 interface
        // For simplicity, we're leaving this as a placeholder
    }
}

/*
================================================
DEPLOYMENT INSTRUCTIONS (Using Remix)
================================================

1. GO TO REMIX:
   - Visit: https://remix.ethereum.org
   - Create new file: PinoToken.sol
   - Paste this contract code

2. COMPILE:
   - Click "Solidity Compiler" (left sidebar)
   - Select compiler version: 0.8.20+
   - Click "Compile PinoToken.sol"
   - Should see green checkmark ✅

3. GET TEST MATIC:
   - Visit: https://faucet.polygon.technology
   - Select "Mumbai" network
   - Paste your MetaMask address
   - Click "Submit"
   - Wait ~1 minute for test MATIC

4. ADD MUMBAI TO METAMASK:
   - Network Name: Polygon Mumbai
   - RPC URL: https://rpc-mumbai.maticvigil.com
   - Chain ID: 80001
   - Currency Symbol: MATIC
   - Block Explorer: https://mumbai.polygonscan.com

5. DEPLOY CONTRACT:
   - Click "Deploy & Run" (left sidebar)
   - Environment: "Injected Provider - MetaMask"
   - Should show "Custom (80001) network"
   - Click "Deploy"
   - Confirm in MetaMask
   - Wait 10-30 seconds
   - Contract appears under "Deployed Contracts" ✅

6. TEST CONTRACT:
   - Click "name" → Should show "Pino Reward Token"
   - Click "symbol" → Should show "PINO"
   - Click "totalSupply" → Should show 1000000000000000000000000
   - Click "balanceOf" → Paste your address → Should show full supply

7. SAVE CONTRACT ADDRESS:
   - Copy contract address from Deployed Contracts
   - Add to .env.local:
     NEXT_PUBLIC_PINO_TOKEN_ADDRESS=0xYOUR_CONTRACT_ADDRESS
     NEXT_PUBLIC_CHAIN_ID=80001
     NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com

8. VERIFY ON POLYGONSCAN:
   - Visit: https://mumbai.polygonscan.com
   - Search for your contract address
   - Should see deployment transaction ✅

================================================
TESTING THE REWARD FUNCTION
================================================

In Remix, under Deployed Contracts:
1. Expand "rewardUser" function
2. Enter:
   - user: <recipient_wallet_address>
   - amount: 10000000000000000000 (= 10 tokens)
   - reason: "Test_Reward"
3. Click "transact"
4. Confirm in MetaMask
5. Check balanceOf(recipient) → Should show 10 tokens!

================================================
GRANT APPLICATION PROOF
================================================

After deployment, you can prove to grant committees:
✅ Live contract on Polygon Mumbai
✅ Transaction history on PolygonScan
✅ Working reward distribution
✅ Real wallet integration
✅ Testnet validation complete

This significantly boosts your application! 🚀
*/
