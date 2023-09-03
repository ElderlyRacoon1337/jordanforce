export const jwtDecode = (token: string) => {
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString(),
  );

  return payload.sub;
};
