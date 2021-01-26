import { useState, useEffect } from "react";
import axios from "axios";

interface IUseOverviewDataType {
  fundManager: string
  fundCode: string;
  dateRange: "all" | "1m" | "3m" | "6m" | "12m";
}

const urlPrefix = process.env.REACT_APP_RAW_PREFIX;

const useOverviewData = ({ fundManager, fundCode, dateRange }: IUseOverviewDataType) => {
  const [income, setIncome] = useState<number[][]>([]);
  const [handleIncome, setHandleIncome] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const btcPriceUrl = `${urlPrefix}/${fundManager}/main/${fundCode}/raw/btc_price.json`;
    const url = `${urlPrefix}/${fundManager}/main/${fundCode}/${dateRange}.json`;

    const fetchData = async () => {
      const [{ data: handleBtcPrice }, { data: handleAll }]: Array<{
        data: number[][];
      }> = await Promise.all([axios.get(btcPriceUrl), axios.get(url)]);
      const startPriceByHandle = handleBtcPrice[0][1];
      const income = handleAll.map((x) => [x[0] * 1000, x[2] * 100]);
      const handleIncome = handleBtcPrice.map((x) => [
        x[0] * 1000,
        (x[1] / startPriceByHandle - 1) * 100,
      ]);

      setIncome(income);
      setHandleIncome(handleIncome);
      setIsLoading(false);
    };

    fetchData();
    return () => {
      setIncome([]);
      setHandleIncome([]);
      setIsLoading(true);
    };
  }, [fundManager, fundCode, dateRange]);

  return {
    income,
    handleIncome,
    isLoading,
  };
};

export default useOverviewData;
