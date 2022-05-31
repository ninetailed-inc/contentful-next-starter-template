import { useState, useEffect } from 'react';
import { ProfileState } from '@ninetailed/experience.js';

import { useNinetailed } from './useNinetailed';

export const useProfile = () => {
  const ninetailed = useNinetailed();
  const [profileState, setProfileState] = useState<ProfileState>(ninetailed.profileState);

  useEffect(() => {
    return ninetailed.onProfileChange((profileState) => {
      setProfileState(profileState);
    });
  }, []);

  return profileState
};
