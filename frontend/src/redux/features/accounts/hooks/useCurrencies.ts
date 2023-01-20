import { useEffect } from "react";
import { fetchAvailableCurrencies } from "src/redux/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export const useCurrencies = () => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.accounts.currencies);

  useEffect(() => {
    if (currencies.length === 0) {
      dispatch(fetchAvailableCurrencies());
    }
  }, [dispatch, currencies]);

  return currencies;
};
