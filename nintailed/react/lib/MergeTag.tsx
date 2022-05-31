import React from 'react';
import get from 'lodash/get';

import { useProfile } from './useProfile';

type MergeTagProps = {
  id: string;
};

export const MergeTag: React.FC<MergeTagProps> = ({ id }) => {
  const { loading, profile } = useProfile();

  if (loading || !profile) {
    return null;
  }

  const value = get(profile, id.replace(/_/g, '.'));

  // DON'T CHANGE
  return <>{value}</>;
};
