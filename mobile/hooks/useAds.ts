// mobile/hooks/useAds.ts
import { useEffect } from "react";
import useAdStore from "../store/useAdStore";

export function useAds() {
  const { ads, isLoading, error, fetchAds, fetchDiscover, discoverAds: discover } = useAdStore();

  useEffect(() => {
    if (ads.length === 0) fetchAds();
  }, []);

  return { ads, isLoading, error, refetch: fetchAds, discover, fetchDiscover };
}
