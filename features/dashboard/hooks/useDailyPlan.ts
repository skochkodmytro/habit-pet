import { useEffect, useRef, useState } from 'react';

import { DailyPlanItem, HabitWithLog } from '../types';
import { getAiAdvicesPerDay } from '../apis';
import { useBoolean } from '@/hooks';

const useDailyPlan = (habits: HabitWithLog[]) => {
  const isAlreadyFetch = useRef(false);

  const [dailyPlanItems, setDailyPlanItems] = useState<DailyPlanItem[]>([]);
  const {
    value: isLoading,
    setTrue: startLoading,
    setFalse: finishLoading,
  } = useBoolean(false);

  useEffect(() => {
    if (isAlreadyFetch.current || habits.length === 0) return;

    isAlreadyFetch.current = true;

    fetchDailyPlan();
  }, [habits]);

  const fetchDailyPlan = async () => {
    startLoading();

    getAiAdvicesPerDay(habits).then(setDailyPlanItems).finally(finishLoading);
  };

  return { dailyPlanItems, isLoading };
};

export default useDailyPlan;
