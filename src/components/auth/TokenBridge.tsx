import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setTokenGetter } from '../../api/apiClient';

/**
 * TokenBridge - Invisible component that runs inside ClerkProvider
 * to inject Clerk's getToken function into the Axios interceptor.
 * Must be rendered as a child of ClerkProvider.
 */
export default function TokenBridge() {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(() => getToken());
  }, [getToken]);

  return null;
}
