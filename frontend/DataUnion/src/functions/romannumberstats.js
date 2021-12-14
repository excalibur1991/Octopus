import {getRomanNumberStats} from '../services/API/APIManager';

export const fetchRomanNumberStats = async (setStats = () => {}) => {
  try {
    const res = await getRomanNumberStats();
    if (res && res.result && res.result.length > 0) {
      const stats = res.result.filter(
        (stat) => stat.tag !== 'roman-letter-bounty',
      );
      setStats(stats);
    } else {
      setStats(null);
    }
  } catch (err) {
    setStats(null);
  }
};
