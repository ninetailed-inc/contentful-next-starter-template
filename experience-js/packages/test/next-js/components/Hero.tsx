import React from 'react';

type HeroProps = {
  text: string;
}

export const Hero: React.FC<HeroProps> = ({ text }) => {
  return <h1>{text}</h1>
}
