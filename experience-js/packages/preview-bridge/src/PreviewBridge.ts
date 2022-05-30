import zoid from 'zoid';

const BASE_URL = 'https://preview.widgets.ninetailed.io';

type PreviewBridgeOptions = {
  url?: string;
};

export const PreviewBridge = ({ url = BASE_URL }: PreviewBridgeOptions) => {
  const bridge = zoid.create({
    tag: 'ninetailed-preview',
    url,

    dimensions: {
      width: `432px`,
      height: `100vh`,
    },
  });
  return bridge();
};
