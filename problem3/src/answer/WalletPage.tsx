import React, { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Helper function to get the priority of each blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // Efficient Memoization: useMemo is used to avoid unnecessary recalculations of sorted balances and formatted balances. Dependencies are set correctly.
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Correct Filtering Logic: The filtering logic now correctly checks balancePriority and ensures only balances with an amount greater than 0 are included.
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // Avoid Redundant Priority Calculation: Priority is calculated once per balance and reused in the sorting function.
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Sort balances based on priority
        return rightPriority - leftPriority;
      });
  }, [balances]); // Depend only on balances

  // Separation of Concerns: Formatted balances are calculated in a separate useMemo hook to ensure separation of concerns and avoid redundant recalculations.
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(), // Format the amount
    }));
  }, [sortedBalances]);

  // Memoize the rows to avoid recalculating them on every render
  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      // Avoid Direct Calculation in JSX: The usdValue is calculated outside the JSX to avoid repetitive computations during rendering.
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]); // Depend on formattedBalances and prices

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
